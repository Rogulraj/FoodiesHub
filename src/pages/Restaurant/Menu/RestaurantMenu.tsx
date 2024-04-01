//packages
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import React, { useEffect, useState } from "react";

//components
import MenuTypeCard from "@components/Cards/MenuTypeCard/MenuTypeCard";
import MenuTypeBtnCard from "@components/Cards/MenuTypeBtnCard/MenuTypeBtnCard";
import MenuItemCard from "@components/Cards/MenuItemCard/MenuItemCard";
import CreateMealForm from "@components/Form/CreateMealForm/CreateMealForm";

//css
import defaultStyle from "./RestaurantMenu.module.css";
import CreateCategoryForm from "@components/Form/CreateCategoryForm/CreateCategoryForm";
import { useGetRestaurantByIdQuery } from "../../../services/restaurant.service";
import { MenuType } from "src/models/restaurant.model";
import { toast } from "react-toastify";

import CustomIconButton from "@components/Elements/CustomIconButton/CustomIconButton";
import { GetCookies } from "@helper/cookies.helper";
import { useAppDispatch } from "../../../redux/store/store";
import { userDetailsActions } from "../../../redux/features/userDetails.slice";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import SecondaryHeader from "@components/Headers/SecondaryHeader/SecondaryHeader";

// types
export type ModalType = "category" | "meal";

//React Element
const RestaurantMenu = (): React.ReactElement => {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: ModalType;
  }>({ isOpen: false, type: "category" });
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const restaurantId = GetCookies("restaurantId");

  const {
    data: restaurantData,
    isError: isRestaurantFetchError,
    refetch: GetRestaurantByIdRefetch,
  } = useGetRestaurantByIdQuery({ id: restaurantId as string });

  const dispatch = useAppDispatch();

  const closeModal = (type: ModalType): void => {
    setModal({ isOpen: false, type });
  };

  const openModal = (type: ModalType): void => {
    setModal({ isOpen: true, type });
  };

  const handleRefetch = async () => {
    try {
      await GetRestaurantByIdRefetch();
      setSelectedCategory(0);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (restaurantData?.statusCode === 200) {
      dispatch(
        userDetailsActions.handleData({
          name: restaurantData.data.name,
          imageUrl: restaurantData.data.imageUrl,
        })
      );
    } else if (isRestaurantFetchError) {
      toast.error("Something went wrong!");
    }
  }, [restaurantData, isRestaurantFetchError]);

  return (
    <>
      <CustomHelmet title="Menu" />
      <SecondaryHeader refetch={handleRefetch} />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <div className={defaultStyle.category_menu_container}>
            <h3 className={defaultStyle.title}>Category menu</h3>
            {restaurantData !== undefined &&
            restaurantData.data.menu.length > 0 ? (
              <ul className={defaultStyle.category_card}>
                {restaurantData?.data.menu.map((item, _index) => (
                  <li
                    key={_index}
                    onClick={() => setSelectedCategory(_index)}
                    className={defaultStyle.category_card_item}>
                    <MenuTypeCard
                      categoryId={item._id as string}
                      title={item.category}
                      subText={`${item.items.length} items`}
                      isSelected={selectedCategory === _index}
                      handleReFetch={handleRefetch}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className={defaultStyle.no_category_card}>
                <CustomIconButton mainText="Add Menu Category" />
              </div>
            )}
            <hr className={defaultStyle.full_underline} />
            <div className={defaultStyle.category_btn_card}>
              <MenuTypeBtnCard
                title={"New category"}
                modalType="category"
                openModal={openModal}
              />
              <MenuTypeBtnCard
                title={"New meal item"}
                modalType="meal"
                openModal={openModal}
              />
            </div>
          </div>
          <div className={defaultStyle.menu_item_container}>
            <h3 className={defaultStyle.title}>
              {restaurantData?.data.menu[selectedCategory]?.category}
            </h3>
            {restaurantData !== undefined &&
            restaurantData?.data.menu[selectedCategory]?.items?.length > 0 ? (
              <ul className={defaultStyle.menu_item_card}>
                {restaurantData?.data.menu[selectedCategory]?.items?.map(
                  (item, _index) => (
                    <MenuItemCard
                      key={_index}
                      {...item}
                      categoryId={
                        restaurantData?.data.menu[selectedCategory]
                          ._id as string
                      }
                      refetch={handleRefetch}
                    />
                  )
                )}
              </ul>
            ) : (
              <div className={defaultStyle.no_data_card}>
                <CustomIconButton mainText="Add Menu Item" />
              </div>
            )}
          </div>

          <CreateCategoryForm
            closeModal={closeModal}
            isModal={modal.isOpen}
            modalType={modal.type}
            refetch={handleRefetch}
          />
          <CreateMealForm
            closeModal={closeModal}
            isModal={modal.isOpen}
            modalType={modal.type}
            refetch={handleRefetch}
            menuList={restaurantData?.data.menu as MenuType[]}
          />
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default RestaurantMenu;

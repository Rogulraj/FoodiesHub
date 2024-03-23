//packages
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import React, { useState } from "react";

//components
import MenuTypeCard from "@components/Cards/MenuTypeCard/MenuTypeCard";
import MenuTypeBtnCard from "@components/Cards/MenuTypeBtnCard/MenuTypeBtnCard";
import MenuItemCard from "@components/Cards/MenuItemCard/MenuItemCard";
import CreateMealForm from "@components/Form/CreateMealForm/CreateMealForm";

//css
import defaultStyle from "./RestaurantMenu.module.css";
import CreateCategoryForm from "@components/Form/CreateCategoryForm/CreateCategoryForm";

const categoryCard = [
  { title: "Breakfast menu", total: 17 },
  { title: "Lunch menu", total: 15 },
  { title: "Dinner menu", total: 16 },
  { title: "Drinks menu", total: 12 },
];

// types
export interface ModalType {
  type: "category" | "meal";
}

//React Element
const RestaurantMenu = (): React.ReactElement => {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: ModalType["type"];
  }>({ isOpen: false, type: "category" });
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const closeModal = (type: ModalType["type"]): void => {
    setModal({ isOpen: false, type });
  };

  const openModal = (type: ModalType["type"]): void => {
    setModal({ isOpen: true, type });
  };

  console.log("selected =>", selectedCategory);

  return (
    <>
      <CustomHelmet title="Menu" />
      <div className={defaultStyle.main_layout}>
        <div className={defaultStyle.category_menu_container}>
          <h3 className={defaultStyle.title}>Category menu</h3>
          <ul className={defaultStyle.category_card}>
            {categoryCard.map((item, _index) => (
              <li
                key={_index}
                onClick={() => setSelectedCategory(_index)}
                className={defaultStyle.category_card_item}>
                <MenuTypeCard
                  title={item.title}
                  subText={`${item.total} items`}
                  isSelected={selectedCategory === _index}
                />
              </li>
            ))}
          </ul>
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
            {categoryCard[selectedCategory].title}
          </h3>
          <ul className={defaultStyle.menu_item_card}>
            {[1, 2, 4, 5].map((item, _index) => (
              <MenuItemCard key={_index} />
            ))}
          </ul>
        </div>

        <CreateCategoryForm
          closeModal={closeModal}
          isModal={modal.isOpen}
          modalType={modal.type}
        />
        <CreateMealForm
          closeModal={closeModal}
          isModal={modal.isOpen}
          modalType={modal.type}
        />
      </div>
    </>
  );
};

export default RestaurantMenu;

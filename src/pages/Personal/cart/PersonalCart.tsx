import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import PrimaryHeader from "@components/Headers/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layouts/MaxWidthLayout/MaxWidthLayout";
import React from "react";

import defaultStyle from "./PersonalCart.module.css";
import CartMenuItemCard from "@components/Cards/CartMenuItemCard/CartMenuItemCard";
import pic from "@assets/restaurant/restaurant_1.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import colorTheme from "@constants/colorTheme";
import PaymentCard from "@components/Cards/PaymentCard/PaymentCard";
import { useAppSelector } from "../../../redux/store/store";
import { useNavigate } from "react-router-dom";

// const cartList = [
//   {
//     name: "dosa",
//     price: 10,
//     quantity: 2,
//     imageUrl: pic,
//     category: "Dinner",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
//   {
//     name: "dosa",
//     price: 10,
//     quantity: 2,
//     imageUrl: pic,
//     category: "Dinner",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
//   {
//     name: "dosa",
//     price: 10,
//     quantity: 2,
//     imageUrl: pic,
//     category: "Dinner",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
//   {
//     name: "dosa",
//     price: 10,
//     quantity: 2,
//     imageUrl: pic,
//     category: "Dinner",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
// ];

const PersonalCart = (): React.ReactElement => {
  const { cartList } = useAppSelector((state) => state.cart);

  const navigate = useNavigate();

  const gotoRestaurantPage = () => {
    navigate(-2);
  };
  console.log(cartList);
  return (
    <>
      <CustomHelmet title="Cart" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={defaultStyle.main_layout}>
          <h1 className={defaultStyle.main_title}>My Cart</h1>
          <div className={defaultStyle.content_layout}>
            <div className={defaultStyle.menu_container}>
              <ul className={defaultStyle.cart_list}>
                <li className={defaultStyle.cart_list_title_card}>
                  <h3 className={defaultStyle.menu_title}>Menu</h3>
                </li>
                {cartList.map((item, _index) => (
                  <li key={_index} className={defaultStyle.cart_list_item}>
                    <CartMenuItemCard {...item} />
                    {cartList.length - 1 !== _index && (
                      <hr className={defaultStyle.cart_menu_item_underline} />
                    )}
                  </li>
                ))}
              </ul>
              <div
                className={defaultStyle.add_more_card}
                onClick={gotoRestaurantPage}>
                <FaArrowLeftLong size={20} color={colorTheme.primary_accent} />
                <h3 className={defaultStyle.add_more_text}>Add more meals</h3>
              </div>
            </div>
            <div className={defaultStyle.payment_container}>
              <div className={defaultStyle.payment_card}>
                <PaymentCard cartList={cartList} />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthLayout>
    </>
  );
};

export default PersonalCart;

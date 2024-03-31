//packages
import React, { useState } from "react";

//css
import defaultStyle from "./SecondaryHeader.module.css";

//components
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";

//icons
import { RiShoppingBag3Line } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

//assets
import profilePic from "@assets/profile.jpg";
import colorTheme from "@constants/colorTheme";
import { NavLink, useNavigate } from "react-router-dom";
import routePaths from "@constants/routePaths";
import { useAppSelector } from "../../../redux/store/store";
import PersonalInformationForm from "@components/Form/PersonalInformationForm/PersonalInformationForm";

//React Element
const SecondaryHeader = (): React.ReactElement => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isPersonalInformationModal, setIsPersonalInformationModal] =
    useState<boolean>(false);

  /** redux */
  const { cartList } = useAppSelector((state) => state.cart);
  const userDetails = useAppSelector((state) => state.userDetails);

  const navigate = useNavigate();

  function closePersonalInformationModal(): void {
    setIsPersonalInformationModal(false);
  }

  return (
    <div className={defaultStyle.main_layout}>
      <div className={defaultStyle.sub_layout}>
        <div
          className={defaultStyle.title_card}
          onClick={() => navigate(routePaths.personalHome)}>
          <DefaultTitle variant="restaurant" />
        </div>
        <ul className={defaultStyle.header_list}>
          <li className={defaultStyle.nav_card_layout}>
            <nav className={defaultStyle.nav_card}>
              <NavLink
                to={routePaths.restaurantHome}
                className={defaultStyle.nav_link}>
                <p className={defaultStyle.nav_text}>Restaurants</p>
              </NavLink>
            </nav>
          </li>
          <li className={defaultStyle.shop_icon_card}>
            <RiShoppingBag3Line
              className={defaultStyle.shop_icon}
              color={colorTheme.primary_accent}
              onClick={() => navigate(routePaths.personalCart)}
            />
            {cartList?.length ? (
              <p className={defaultStyle.badge}>{cartList?.length}</p>
            ) : null}
          </li>
          <li
            className={defaultStyle.profile_card}
            onClick={() => setIsPersonalInformationModal(true)}>
            <img
              src={profilePic}
              alt="profile"
              className={defaultStyle.profile_pic}
            />
          </li>
          <li
            className={defaultStyle.menu_icon_card}
            onClick={() => setMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <IoClose size={20} color={colorTheme.light_black_200} />
            ) : (
              <LuMenu size={20} color={colorTheme.light_black_200} />
            )}
          </li>
          {isMenuOpen && (
            <li className={defaultStyle.menu_icon_items_card}>
              <nav className={defaultStyle.menu_nav_card}>
                <NavLink
                  to={routePaths.restaurantHome}
                  className={defaultStyle.nav_link}>
                  <p className={defaultStyle.menu_nav_text}>Restaurants</p>
                </NavLink>
              </nav>
            </li>
          )}
        </ul>
      </div>
      <PersonalInformationForm
        isModal={isPersonalInformationModal}
        closeModal={closePersonalInformationModal}
      />
    </div>
  );
};

export default SecondaryHeader;

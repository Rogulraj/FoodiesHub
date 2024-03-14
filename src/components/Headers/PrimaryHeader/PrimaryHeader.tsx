//packages
import React, { useState } from "react";

//css
import defaultStyle from "./PrimaryHeader.module.css";

//components
import DefaultTitle from "@components/Elements/DefaultTitle/DefaultTitle";

//icons
import { RiShoppingBag3Line } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

//assets
import profilePic from "@assets/profile.jpg";
import colorTheme from "@constants/colorTheme";
import { NavLink } from "react-router-dom";

const navList = ["Restaurant", "Deals", "My orders"];

//React Element
const PrimaryHeader = (): React.ReactElement => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className={defaultStyle.main_layout}>
      <div className={defaultStyle.sub_layout}>
        <div className={defaultStyle.title_card}>
          <DefaultTitle />
        </div>
        <ul className={defaultStyle.header_list}>
          <li className={defaultStyle.nav_card_layout}>
            <nav className={defaultStyle.nav_card}>
              {navList.map((item, _index) => (
                <NavLink
                  to={"/"}
                  key={_index}
                  className={defaultStyle.nav_link}>
                  <p className={defaultStyle.nav_text}>{item}</p>
                </NavLink>
              ))}
            </nav>
          </li>
          <li className={defaultStyle.shop_icon_card}>
            <RiShoppingBag3Line size={20} color={colorTheme.primary_accent} />
          </li>
          <li className={defaultStyle.profile_card}>
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
                {navList.map((item, _index) => (
                  <NavLink
                    to={"/"}
                    key={_index}
                    className={defaultStyle.nav_link}>
                    <p className={defaultStyle.menu_nav_text}>{item}</p>
                  </NavLink>
                ))}
              </nav>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PrimaryHeader;

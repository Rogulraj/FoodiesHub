//packages
import React from "react";

//css
import defaultStyle from "./DefaultTitle.module.css";
import { AccountType } from "@interfaces/accountType.interface";

interface DefaultTitleProps {
  variant: AccountType["accountType"];
}

//React Element
const DefaultTitle = ({ variant }: DefaultTitleProps): React.ReactElement => {
  return (
    <div className={defaultStyle.main_layout}>
      <h2 className={defaultStyle.title1}>Foodies</h2>
      <h2 className={defaultStyle.title2}>Hub</h2>
      {variant === "restaurant" ? (
        <p className={defaultStyle.for_owners_text}>for owners</p>
      ) : null}
    </div>
  );
};

export default DefaultTitle;

//packages
import React from "react";

//css
import defaultStyle from "./DefaultTitle.module.css";

//React Element
const DefaultTitle = (): React.ReactElement => {
  return (
    <div className={defaultStyle.main_layout}>
      <h2 className={defaultStyle.title1}>Foodies</h2>
      <h2 className={defaultStyle.title2}>Hub</h2>
    </div>
  );
};

export default DefaultTitle;

import React, { CSSProperties } from "react";

//css
import defaultStyle from "./MaxWidthLayout.module.css";

//types
interface MaxWidthLayoutPropsType {
  children: React.ReactElement;
  maxWidth?: CSSProperties["maxWidth"];
}

const MaxWidthLayout = ({ children, maxWidth }: MaxWidthLayoutPropsType) => {
  return (
    <div className={defaultStyle.main_layout}>
      <div className={defaultStyle.sub_layout} style={{ maxWidth: maxWidth }}>
        {children}
      </div>
    </div>
  );
};

export default MaxWidthLayout;

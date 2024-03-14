//packages
import React from "react";

//css
import defaultStyle from "./CategoryCard.module.css";

//types
interface CategoryCardPropsType {
  title: string;
  imageUrl: string;
}

//React Element
const CategoryCard = ({
  imageUrl,
  title,
}: CategoryCardPropsType): React.ReactElement => {
  return (
    <div className={defaultStyle.main_layout}>
      <img src={imageUrl} alt="category" className={defaultStyle.icon_style} />
      <h4 className={defaultStyle.title}>{title}</h4>
    </div>
  );
};

export default CategoryCard;

import React, { CSSProperties } from "react";

//css
import defaultStyle from "./DealPosterCard.module.css";

interface DealPosterCardPropsType {
  mainStyle?: CSSProperties;
  title: string;
  subTitle: string;
  offerText: string;
  offerTextStyle?: CSSProperties;
  imageUrl: string;
}

const DealPosterCard = ({
  mainStyle,
  imageUrl,
  offerText,
  subTitle,
  title,
  offerTextStyle,
}: DealPosterCardPropsType): React.ReactElement => {
  return (
    <div className={defaultStyle.main_layout} style={mainStyle}>
      <div className={defaultStyle.dual_heading_card}>
        <h4 className={defaultStyle.dual_main_text}>{title}</h4>
        <h5 className={defaultStyle.dual_sub_text}>{subTitle}</h5>
      </div>
      <h1 className={defaultStyle.offer_text} style={offerTextStyle}>
        {offerText}
      </h1>
      <div className={defaultStyle.offer_image_card}>
        <img src={imageUrl} alt="offer" className={defaultStyle.offer_image} />
      </div>
    </div>
  );
};

export default DealPosterCard;

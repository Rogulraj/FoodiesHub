import React from "react";

//css
import defaultStyle from "./TimelineBar.module.css";

//icon
import { GoDotFill } from "react-icons/go";
import colorTheme from "@constants/colorTheme";
import { FaCheckCircle } from "react-icons/fa";

export interface TimelineListType {
  title: string;
}

export interface TimelineBarPropsType {
  timelineList: TimelineListType[];
  currentTimeline: string;
}

const TimelineBar = ({
  currentTimeline,
  timelineList,
}: TimelineBarPropsType): React.ReactElement => {
  const timelineIndex = timelineList.findIndex(
    (item) => item.title === currentTimeline
  );

  console.log(timelineList.length, currentTimeline, timelineIndex);
  return (
    <ul className={defaultStyle.main_layout}>
      {timelineList.map((item, _index) => (
        <li className={defaultStyle.item_card} key={_index}>
          <div className={defaultStyle.dot_design_card}>
            {timelineIndex > _index ? (
              <FaCheckCircle
                size={25}
                fill="green"
                className={defaultStyle.dot_icon}
              />
            ) : (
              <GoDotFill
                size={25}
                className={defaultStyle.dot_icon}
                style={{
                  color:
                    currentTimeline === item.title
                      ? colorTheme.secondary_accent
                      : colorTheme.primary_border,
                }}
              />
            )}

            {timelineList.length - 1 > _index ? (
              <div
                className={defaultStyle.bar_design}
                style={{
                  backgroundColor:
                    timelineIndex > _index
                      ? "green"
                      : colorTheme.primary_border,
                }}></div>
            ) : (
              <div
                className={defaultStyle.bar_design}
                style={{ backgroundColor: "transparent" }}></div>
            )}
          </div>

          <p
            className={defaultStyle.title}
            style={{
              color:
                currentTimeline === item.title
                  ? colorTheme.black
                  : colorTheme.light_black_200,
            }}>
            {item.title}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TimelineBar;

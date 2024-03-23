// constants
import authTimelineList, {
  personalTimelineList,
  restaurantTimelineList,
} from "@constants/authTimeline";

// types
import { TimelineListType } from "@components/Elements/TimelineBar/TimelineBar";
import { AccountType } from "@interfaces/accountType.interface";

// helper functions
export function TimelineListFinder(
  accountType: AccountType["accountType"]
): TimelineListType[] {
  switch (accountType) {
    case "personal":
      return personalTimelineList;

    case "restaurant":
      return restaurantTimelineList;

    default:
      return authTimelineList;
  }
}

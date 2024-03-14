//assets
import pizza from "@assets/pizza_icon.png";
import burger from "@assets/burger_icon.png";
import vegan from "@assets/vegan_icon.png";
import desserts from "@assets/desserts_icon.png";

//types
export interface CategoruListType {
  title: string;
  imageUrl: string;
}

const categoryList: CategoruListType[] = [
  {
    title: "Pizza",
    imageUrl: pizza,
  },
  {
    title: "Burger",
    imageUrl: burger,
  },
  { title: "Vegan", imageUrl: vegan },
  { title: "Desserts", imageUrl: desserts },
];

export default categoryList;

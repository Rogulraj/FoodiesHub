import { RestaurantTagsList } from "@constants/restaurant";

export interface MenuCategoryItems {
  _id?: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  ingredients: string;
  nutritions: string;
}

export interface MenuType {
  _id?: string;
  category: string;
  items: MenuCategoryItems[];
}

export interface RestaurantModel {
  _id?: string;
  name: string;
  imageUrl: string;
  deliveryDuration: string;
  minOrderVal: number;
  tags: RestaurantTagsList;
  menu: MenuType[];
}

export interface CreateMenuCategoryModels {
  category: string;
}
export interface CreateMenuItemModels {
  category: string;
  item?: MenuCategoryItems;
}

export interface CreateRestaurantModels extends RestaurantModel {}

export interface UpdateFoodByIdModel {
  foodId: string;
  restaurantId: string;
  categoryId: string;
  item: MenuCategoryItems;
}

export interface RemoveFoodByIdModel {
  foodId: string;
  restaurantId: string;
  categoryId: string;
}

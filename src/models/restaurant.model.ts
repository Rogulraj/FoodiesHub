import { RestaurantTagsList } from "@constants/restaurant";

export interface MenuItemsType {
  _id?: string;
  name?: string;
  imageUrl?: string;
  price?: string;
  description?: string;
  ingredients?: string;
  nutritions?: string;
}

export interface MenuType {
  [key: string]: MenuItemsType[];
}

export interface RestaurantModel {
  _id?: string;
  name: string;
  imageUrl: string;
  deliveryDuration: string;
  minOrderVal: number;
  tags: RestaurantTagsList;
  menuType?: MenuType;
}

export interface CreateMenuTypeModels {
  type: string;
}
export interface CreateMenuItemModels {
  type: string;
  item?: MenuItemsType;
}

export interface CreateRestaurantModels extends RestaurantModel {}

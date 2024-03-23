export interface CreateMenuTypeModels {
  type: string;
}

export interface MenuItemsType {
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  ingredients: string;
  nutritions: string;
}

export interface CreateMenuItemModels {
  type: string;
  item?: MenuItemsType;
}

export interface CreateRestaurantModels {
  name: string;
  menuType: object;
  imageUrl: string;
}

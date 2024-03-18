export interface CreateUserResponse {
  _id: string;
  email: string;
  accountType: string;
}

export interface LoginUserResponse {
  email: string;
}

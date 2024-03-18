export interface CreateUserBody {
  accountType: string;
  email: string;
  password: string;
}

export interface LoginUserBody {
  email: string;
  password: string;
}

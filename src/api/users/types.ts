export type LoginResponse = {
  data: UserResponse
}

export type UserResponse = {
  message: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    marketing_consent: boolean;
  },  
  token: string;
}

export type UserList = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  marketing_consent: boolean;
}
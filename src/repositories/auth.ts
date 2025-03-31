import type { AxiosInstance } from 'axios';
import type { Response } from 'src/types/http';

export default function(http: AxiosInstance) {
  return {
    login(body: LoginBody) {
      return http.post<Response<LoginSuccess>>('login', body);
    },
    showUser() {
      return http.get<Response<User>>('auth/user');
    },
  };
};

export interface LoginBody {
  email: string,
  password: string,
  device_name: string,
}


export interface User {
  id: number,
  email: string,
  name: string,
}

export interface LoginSuccess {
  token: string,
  user: User,
}

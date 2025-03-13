import type { AxiosInstance } from 'axios';
import type { Response } from 'src/types/http';

export default function(http: AxiosInstance) {
  return {
    list() {
      return http.get<Response<CompanyListItem[]>>('companies');
    },
    create(body: CompanyBody) {
      return http.post<Response<CompanyListItem>>('companies', body);
    },
    update(id: string | number, body: Partial<CompanyBody>) {
      return http.put<Response<CompanyListItem>>(`companies/${id}`, body);
    },
    show(id: string | number) {
      return http.get<Response<CompanyShowed>>(`companies/${id}`);
    },
    remove(id: string | number) {
      return http.delete<void>(`companies/${id}`);
    }
  };
};

export interface CompanyListItem {
  id: number,
  name: string,
  phone: string | null,
  email: string | null,
}

export interface CompanyBody {
  name: string,
  description: string | null,
  phone: string | null,
  email: string | null,
}

export interface CompanyShowed {
  id: number,
  name: string,
  phone: string | null,
  email: string | null,
  description: string | null,
}

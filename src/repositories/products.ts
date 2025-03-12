import type { Response } from 'src/types/http';
import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    list() {
      return http.get<Response<ProductListItem[]>>('products');
    },
    create(body: ProductBody) {
      return http.post<Response<ProductListItem>>('products', body);
    },
    show(id: string | number) {
      return http.get<Response<ProductListItem>>(`products/${id}`);
    },
    update(id: string | number, body: ProductBody) {
      return http.put<Response<ProductListItem>>(`products/${id}`, body);
    },
    remove(id: string | number) {
      return http.delete<void>(`products/${id}`);
    }
  }
};

export interface ProductListItem {
  id: number,
  name: string,
}

export interface ProductBody {
  name: string,
}

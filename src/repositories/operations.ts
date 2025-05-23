import type { CompanyListItem } from './companies';
import type { ProductListItem } from './products';
import type { FileItem } from './files';
import type { Response } from 'src/types/http';
import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    show(id: string | number) {
      return http.get<Response<OperationShowed>>(`operations/${id}`);
    },
    balance(params: BalanceParams) {
      return http.get<Response<BalanceData>>('operations/balance', { params });
    },
    createCash(body: OperationCashBody) {
      return http.post<void>('operations/cash', body);
    },
    updateCash(id: string | number, body: Omit<OperationCashBody, 'type'>) {
      return http.put<void>(`operations/${id}/cash`, body);
    },
    createProducts(body: OperationProductsBody) {
      return http.post<void>('operations/products', body);
    },
    updateProducts(id: string | number, body: Omit<OperationProductsBody, 'type'>) {
      return http.put<void>(`operations/${id}/products`, body);
    },
    remove(id: string | number) {
      return http.delete<void>(`operations/${id}`);
    },
  };
}

export interface OperationCashBody {
  sum: number | string,
  company_id: number | string,
  comment: string | null,
  type: OperationType,
  payment_source: PaymentSource,
  date_from: string,
  files: number[] | null,
}

export interface OperationProduct {
  id: number | string,
  price: number | string,
  count: number | string,
}

export interface OperationProductsBody {
  company_id: number | string,
  comment: string | null,
  type: OperationType,
  date_from: string,
  files: number[] | null,
  products: OperationProduct[],
}

export interface OperationShowed {
  id: number,
  type: OperationType,
  transaction_type: TransactionType,
  payment_source: PaymentSource,
  sum: number,
  company: CompanyListItem,
  files: FileItem[],
  products: ProductOne[],
  comment: string | null,
  date_from: string,
  created_at: string,
}

export interface BalanceParams {
  date_from: string,
  date_to: string,
  company: number | string,
}

export type TransactionType = 'products' | 'cash';
export type OperationType = 'purchase' | 'supply';
export type PaymentSource = 'checking-account' | 'self-collection' | 'products';

interface OperationBase {
  id: number,
  sum: number,
  type: OperationType,
  payment_source: PaymentSource,
  date_from: string,
  created_at: string,
  company: Omit<CompanyListItem, 'description'>,
}

export type OperationCashOne = {
  transaction_type: 'cash',
} & OperationBase;

export type ProductOne = ProductListItem & { price: number, count: number };

export type OperationProductsOne = {
  transaction_type: 'products',
  products: ProductOne[],
} & OperationBase;

export type OperationRow = OperationCashOne | OperationProductsOne;

export interface BalanceData {
  income_total: number,
  outcome_total: number,
  balance: number,
  operations: OperationRow[],
}

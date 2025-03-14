import type { CompanyListItem } from './companies';
import type { ProductListItem } from './products';
import type { FileItem } from './files';
import type { Response } from 'src/types/http';
import type { AxiosInstance } from 'axios';

export default function(http: AxiosInstance) {
  return {
    show(id: string | number) {
      return http.get<BalanceResponce>(`operations/${id}`);
    },
    balance(params: BalanceParams) {
      return http.get<BalanceResponce>('operations/balance', { params });
    },
    createCash(body: OperationCashBody) {
      return http.post<void>('operations/cash', body);
    },
    createProducts(body: OperationProductsBody) {
      return http.post<void>('operations/products', body);
    },
  };
}

export interface OperationCashBody {
  sum: number | string,
  company_id: number | string,
  comment: string | null,
  type: OperationType,
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
  files: number[] | null,
  products: OperationProduct[],
}

export interface OperationShowed {
  id: number,
  type: OperationType,
  transaction_type: TransactionType,
  sum: number,
  company: CompanyListItem,
  files: FileItem[],
  products: ProductListItem[],
  comment: string | null,
  created_at: string,
}

export interface BalanceParams {
  date_from: string,
  date_to: string,
  company: number,
}

export type TransactionType = 'products' | 'cash';
export type OperationType = 'purchase' | 'supply';

interface OperationBase {
  id: number,
  sum: number,
  type: OperationType,
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
  balance: number,
  operations: OperationRow[],
}

export type BalanceResponce = Response<BalanceData>;

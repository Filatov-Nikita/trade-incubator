import { OperationProduct } from 'src/repositories/operations';
import { ProductListItem } from 'src/repositories/products';

export type ProductItem = Omit<OperationProduct, 'id'> & { product: ProductListItem };

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product} from '../interfaces/products.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Product[]>('/api/products');
  }

  post(payload: ProductPayload) {
    return this.httpClient.post<Product[]>('/api/products', payload);
  }
  constructor() { }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utils} from "../shared/utils";
import {ProductDTO} from "../shared/interface";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(Utils.BASE_URL + Utils.PRODUCTS);
  }
}

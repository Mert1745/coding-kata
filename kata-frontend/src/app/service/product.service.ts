import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utils} from "../shared/utils";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<String> {
    return this.http.get(Utils.BASE_URL + Utils.PRODUCTS, { responseType: "text" });
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utils} from "../shared/utils";
import {Checkout} from "../shared/interface";
import {environment} from "../../environments/environment.development";

@Injectable({
    providedIn: 'root',
})
export class CartService {

    constructor(private http: HttpClient) {
    }

    checkout(cart: Checkout): Observable<Boolean> {
        return this.http.post<Boolean>(environment.baseUrl + Utils.CHECKOUT, cart);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utils} from "../shared/utils";
import {Checkout} from "../shared/interface";

@Injectable({
    providedIn: 'root',
})
export class CartService {

    constructor(private http: HttpClient) {
    }

    checkout(cart: Checkout): Observable<Boolean> {
        return this.http.post<Boolean>(Utils.BASE_URL + Utils.CHECKOUT, cart);
    }
}

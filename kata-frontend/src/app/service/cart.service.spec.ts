import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { Utils } from '../shared/utils';
import { Checkout } from '../shared/interface';
import {environment} from "../../environments/environment.development";

describe('CartService', () => {
    let service: CartService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CartService]
        });
        service = TestBed.inject(CartService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call checkout API and return Boolean', () => {
        const mockCheckout: Checkout = { price: 100, carts: [] };
        const mockResponse = true;

        service.checkout(mockCheckout).subscribe(response => {
            expect(response).toBe(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.baseUrl + Utils.CHECKOUT);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });
});

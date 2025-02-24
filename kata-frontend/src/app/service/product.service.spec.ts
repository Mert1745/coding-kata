import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductDTO } from '../shared/interface';
import { Utils } from '../shared/utils';
import {environment} from "../../environments/environment.development";

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService]
        });
        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure no outstanding requests remain
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve products from the API', () => {
        const mockProducts: ProductDTO[] = [
            { id: 1, name: 'Apple', prices: [{ id: 1, amount: 35.00, quantity: 1 }] },
            { id: 2, name: 'Banana', prices: [{ id: 2, amount: 50.00, quantity: 1 }] }
        ];

        service.getProducts().subscribe((products) => {
            expect(products.length).toBe(2);
            expect(products).toEqual(mockProducts);
        });

        const req = httpMock.expectOne(environment.baseUrl + Utils.PRODUCTS);
        expect(req.request.method).toBe('GET');
        req.flush(mockProducts);
    });

    it('should handle errors when API call fails', () => {
        service.getProducts().subscribe(
            () => fail('Expected an error, but got a response'),
            (error) => {
                expect(error.status).toBe(500);
            }
        );

        const req = httpMock.expectOne(environment.baseUrl + Utils.PRODUCTS);
        expect(req.request.method).toBe('GET');
        req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
    });
});

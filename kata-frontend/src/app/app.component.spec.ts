import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductService } from './service/product.service';
import { of, throwError } from 'rxjs';
import { ProductDTO } from './shared/interface';
import { ProductState } from './shared/enums';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let productServiceMock: jasmine.SpyObj<ProductService>;

    const mockProducts: ProductDTO[] = [
        { id: 1, name: 'Apple', prices: [{ id: 1, amount: 35.00, quantity: 1 }] },
        { id: 2, name: 'Banana', prices: [{ id: 2, amount: 50.00, quantity: 1 }] }
    ];

    beforeEach(async () => {
        productServiceMock = jasmine.createSpyObj('ProductService', ['getProducts']);

        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [{ provide: ProductService, useValue: productServiceMock }],
            schemas: [NO_ERRORS_SCHEMA] // Ignores unknown elements and attributes in template
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have title 'kata-frontend'`, () => {
        expect(component.title).toEqual('kata-frontend');
    });

    it('should fetch products on initialization', () => {
        productServiceMock.getProducts.and.returnValue(of(mockProducts));
        component.ngOnInit();
        expect(component.products).toEqual(mockProducts);
        expect(component.carts.length).toBe(mockProducts.length);
    });

    it('should set ProductState to FAILED if product service fails', () => {
        productServiceMock.getProducts.and.returnValue(throwError(() => new Error('Service error')));
        component.ngOnInit();
        expect(component.productState).toBe(ProductState.FAILED);
        expect(component.products.length).toBe(0);
    });

    it('should increment quantity when incrementCount is called', () => {
        component.carts = [
            { quantity: 1, product: mockProducts[0] },
            { quantity: 2, product: mockProducts[1] }
        ];

        component.incrementCount(mockProducts[0]);
        expect(component.carts[0].quantity).toBe(2);
    });
});

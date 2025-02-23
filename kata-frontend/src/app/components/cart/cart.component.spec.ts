import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../service/cart.service';
import { CheckoutState } from '../../shared/enums';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let cartServiceMock: jasmine.SpyObj<CartService>;

    beforeEach(async () => {
        cartServiceMock = jasmine.createSpyObj('CartService', ['checkout']);

        await TestBed.configureTestingModule({
            declarations: [CartComponent],
            providers: [
                { provide: CartService, useValue: cartServiceMock },
                ChangeDetectorRef
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        component.carts = [
            {
                quantity: 2,
                product: { id: 1, name: 'Product A', prices: [{ id: 1, quantity: 1, amount: 10 }] }
            },
            {
                quantity: 3,
                product: { id: 2, name: 'Product B', prices: [{ id: 2, quantity: 2, amount: 15 }] }
            }
        ];
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly calculate product price with different quantity offers', () => {
        const cart = {
            quantity: 5,
            product: {
                id: 1,
                name: 'Product A',
                prices: [
                    { id: 1, quantity: 1, amount: 10 },
                    { id: 2, quantity: 3, amount: 25 }
                ]
            }
        };

        expect(component.calculateProductPrice(cart)).toEqual(45); // 1 pack of 3 (25) + 2 single (20) = 45
    });

    it('should update productSum and set checkoutResult to NONE when items exist', () => {
        component.updateProductSums();
        expect(component.productSum.length).toBe(2);
        expect(component.checkoutResult).toBe(CheckoutState.NONE);
    });

    it('should calculate the total sum correctly', () => {
        component.updateProductSums();
        expect(component.getTotalSum()).toBeGreaterThan(0);
    });

    it('should proceed with checkout and reset cart on success', () => {
        cartServiceMock.checkout.and.returnValue(of(true));

        component.proceedCheckout(component.carts);
        expect(cartServiceMock.checkout).toHaveBeenCalled();
        expect(component.checkoutResult).toBe(CheckoutState.SUCCESS);
        expect(component.productSum.length).toBe(0);
        expect(component.carts.every(cart => cart.quantity === 0)).toBeTrue();
    });

    it('should set checkoutResult to FAILED if checkout fails', () => {
        cartServiceMock.checkout.and.returnValue(of(false));

        component.proceedCheckout(component.carts);
        expect(cartServiceMock.checkout).toHaveBeenCalled();
        expect(component.checkoutResult).toBe(CheckoutState.FAILED);
    });

    it('should handle checkout error correctly', () => {
        cartServiceMock.checkout.and.returnValue(throwError(() => new Error('Server Error')));

        component.proceedCheckout(component.carts);
        expect(component.checkoutResult).toBe(CheckoutState.FAILED);
    });
});

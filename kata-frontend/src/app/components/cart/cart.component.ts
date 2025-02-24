import {ChangeDetectorRef, Component, DoCheck, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CartDTO} from "../../shared/interface";
import {CartService} from "../../service/cart.service";
import {catchError, of} from "rxjs";
import {CheckoutState} from "../../shared/enums";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements DoCheck {
    @Input() carts: CartDTO[];
    productSum: { productId: number, amount: number }[] = [];
    checkoutResult: CheckoutState = CheckoutState.NONE;

    protected readonly CheckoutState = CheckoutState;

    constructor(private cdr: ChangeDetectorRef, private cartService: CartService) {
    }

    ngDoCheck() {
        this.updateProductSums();
    }

    updateProductSums() {
        this.productSum = this.carts
            .filter(cart => cart.quantity > 0)
            .map(cart => ({
                productId: cart.product.id,
                amount: this.calculateProductPrice(cart)
            }));

        if (this.carts.some(cart => cart.quantity > 0)) {
            this.checkoutResult = CheckoutState.NONE;
        }

        this.cdr.detectChanges(); // Force UI update
    }


    calculateProductPrice(cart: CartDTO): number {
        const prices = cart.product.prices.sort((one, two) => (one.quantity > two.quantity ? -1 : 1));
        let quantity = cart.quantity;
        let sum = 0;

        prices.forEach(price => {
            let numberPerQuantity = Math.floor(quantity / price.quantity);
            sum += (numberPerQuantity * price.amount);
            quantity -= price.quantity * numberPerQuantity;
        });

        return sum;
    }

    updateQuantity(cart: CartDTO, change: number) {
        cart.quantity = Math.max(0, cart.quantity + change); // Prevent negative values
        this.updateProductSums(); // Recalculate totals
    }

    getProductSum(productId: number): number {
        return this.productSum.find(p => p.productId === productId)?.amount || 0;
    }

    getTotalSum(): number {
        return this.productSum.reduce((total, product) => total + product.amount, 0);
    }

    proceedCheckout(carts: CartDTO[]) {
        const productsInCarts = carts.filter(cart => cart.quantity > 0);
        this.cartService.checkout({price: this.getTotalSum(), carts: productsInCarts})
            .pipe(
                catchError(error => {
                    console.error("Checkout failed:", error);
                    this.checkoutResult = CheckoutState.FAILED;
                    return of(false); // Return a fallback value to prevent subscription from breaking
                })
            )
            .subscribe((result) => {
                if (result) {
                    this.carts.forEach(cart => { cart.quantity = 0 })
                    this.productSum = [];
                }
                this.checkoutResult = result ? CheckoutState.SUCCESS : CheckoutState.FAILED;
            })
    }
}

import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {CartDTO} from "../../shared/interface";
import {CartService} from "../../service/cart.service";
import {catchError, of} from "rxjs";
import {CheckoutState} from "../../shared/enums";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    @Input() carts: CartDTO[];
    productSum: { productId: number, amount: number }[] = [];
    checkoutResult: CheckoutState = CheckoutState.NONE;

    constructor(private cdr: ChangeDetectorRef, private cartService: CartService) {
    }

    calculateProductPrice(cart: CartDTO): number {
        this.checkoutResult = CheckoutState.NONE;
        //Objects that have higher quantity will have to be calculated first as they have special offer.
        const prices = cart.product.prices.sort((one, two) => (one.quantity > two.quantity ? -1 : 1));
        let quantity = cart.quantity;
        let sum = 0;

        prices.forEach(price => {
            let numberPerQuantity = Math.floor(quantity / price.quantity);
            sum += (numberPerQuantity * price.amount);
            quantity -= price.quantity * numberPerQuantity;
        })

        this.calculateProductSum(cart, sum);
        return sum;
    }

    private calculateProductSum(cart: CartDTO, sum: number) {
        const product = this.productSum.find(s => s.productId === cart.product.id);

        if (!product) {
            this.productSum.push({productId: cart.product.id, amount: sum});
        } else {
            product.amount = sum;
        }
        // Defer change detection to prevent infinite loop
        setTimeout(() => this.cdr.detectChanges(), 0);
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

    protected readonly CheckoutState = CheckoutState;
}

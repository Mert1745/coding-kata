import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Cart} from "../../shared/interface";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    @Input() carts: Cart[];
    productSum: { productId: number, amount: number }[] = [];

    constructor(private cdr: ChangeDetectorRef) {
    }

    calculateProductPrice(cart: Cart): number {
        //Higher quantity will have to be calculated first as they have special offer.
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

    private calculateProductSum(cart: Cart, sum: number) {
        const product = this.productSum.find(s => s.productId === cart.product.id);

        if (!product) {
            this.productSum.push({productId: cart.product.id, amount: sum});
        } else {
            product.amount = sum;
        }
        // Defer change detection to prevent infinite loop
        setTimeout(() => this.cdr.detectChanges(), 0);
    }

    increaseProductQuantity(cart: Cart) {
        cart.quantity = cart.quantity + 1;
    }

    decreaseProductQuantity(cart: Cart) {
        cart.quantity = cart.quantity - 1;
    }


    getTotalSum(): number {
        return this.productSum.reduce((total, product) => total + product.amount, 0);
    }

    proceedCheckout() {
        console.log("checkout proceed ", this.productSum.length);
    }
}

import {Component, OnInit} from "@angular/core";
import {ProductService} from "./service/product.service";
import {CartDTO, ProductDTO} from "./shared/interface";
import {catchError, of} from "rxjs";
import {ProductState} from "./shared/enums";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'kata-frontend';
    products: ProductDTO[] = [];
    carts: CartDTO[] = [];
    productState: ProductState = ProductState.SUCCESS;

    constructor(private productService: ProductService) {
    }

    incrementCount(product: ProductDTO) {
        this.carts?.filter(cart => cart.product.id === product.id).forEach(cart => cart.quantity++);
    }

    ngOnInit(): void {
        this.productService.getProducts()
            .pipe(
                catchError(error => {
                    console.error("Error occurred while getting failed: ", error);
                    this.productState = ProductState.FAILED;
                    return of([]); // Return a fallback value to prevent subscription from breaking
                })
            )
            .subscribe((result) => {
            this.products = result;
            this.products.forEach(product => this.carts?.push({quantity: 0, product: product}))
        });
    }

    protected readonly ProductState = ProductState;
}

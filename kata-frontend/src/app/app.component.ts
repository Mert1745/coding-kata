import {Component, OnInit} from "@angular/core";
import {ProductService} from "./service/product.service";
import {CartDTO, ProductDTO} from "./shared/interface";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'kata-frontend';
    products: ProductDTO[] = [];
    carts: CartDTO[] = [];

    constructor(private productService: ProductService) {
    }

    incrementCount(product: ProductDTO) {
        this.carts?.filter(cart => cart.product.id === product.id).forEach(cart => cart.quantity++);
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe((result) => {
            this.products = result;
            this.products.forEach(product => this.carts?.push({quantity: 0, product: product}))
        });
    }
}

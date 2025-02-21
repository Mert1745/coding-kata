import {Component, Input} from '@angular/core';
import {Cart} from "../../shared/interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
    @Input() carts: Cart[] | undefined;
}

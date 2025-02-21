import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductDTO} from "../../shared/interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() products: ProductDTO[] | undefined;
  @Output() count = new EventEmitter<ProductDTO>();

    addNewItem(value: ProductDTO) {
        this.count.emit(value);
    }
}

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ProductDTO} from "../../shared/interface";
import {toArray} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  products: ProductDTO[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
    });
  }
}

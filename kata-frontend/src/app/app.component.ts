import { Component, OnInit } from "@angular/core";
import {ProductService} from "./service/product.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'kata-frontend';
  data: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result) => {
      this.data = result;
    });
  }
}

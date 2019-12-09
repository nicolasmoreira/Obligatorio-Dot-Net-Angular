import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product/prodcut.service";
import { Product } from "../product/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[])=>{
      this.products = products;
      console.log(products);
    })
  }
}
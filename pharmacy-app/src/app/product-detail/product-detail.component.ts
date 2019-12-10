import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product/prodcut.service";
import { Product } from "../product/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product(0,'No Product',"",0);
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.productService.getProduct(1).subscribe((product: Product) =>{
      this.product = product;
    })
  }
}
import { Component, OnInit } from '@angular/core';
import { CartBagService } from '../cart-bag.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartBagService: CartBagService) { }

  ngOnInit() {

  }

}

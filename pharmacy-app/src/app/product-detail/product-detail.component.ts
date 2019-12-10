import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { CartBagService } from '../cart-bag.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public idElement = null;
  public element = null;

  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public cartBagService: CartBagService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.idElement = parseInt(routeParams.idElement, 10);
      this.http
        .get<any>(ENV.api_dev_url + '/articulos/' + this.idElement)
        .subscribe((element) => {
          this.element = element;
        });
    });
  }
}

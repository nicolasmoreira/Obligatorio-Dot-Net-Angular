import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product/prodcut.service";
import { Product } from "../product/product";
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { NoMedicamento } from '../models/nomedicamento.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public noMedicamentos: NoMedicamento[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<NoMedicamento[]>(ENV.api_dev_url + '/nomedicamentoes')
      .subscribe((noMedicamentos: NoMedicamento[]) => {
        this.noMedicamentos = noMedicamentos;
      });
  }
}

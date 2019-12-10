import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { Medicamento } from '../models/medicamento.model';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {
  public medicamentos: Medicamento[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Medicamento[]>(ENV.api_dev_url + '/medicamentoes')
      .subscribe((medicamentos: Medicamento[]) => {
        this.medicamentos = medicamentos;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public categorias: Categoria[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Categoria[]>(ENV.api_dev_url + '/categorias')
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment as ENV } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public categorias: Categoria[];

  constructor(public loginService: LoginService, private http: HttpClient) {}

  ngOnInit() {
    this.loginService.checkAuthenticated();
    this.http
      .get<Categoria[]>(ENV.api_dev_url + '/categorias')
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }
}

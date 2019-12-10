import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NoMedicamento } from '../models/nomedicamento.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public noMedicamentos: NoMedicamento[];

  public idCategoria = null;

  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.idCategoria = parseInt(routeParams.idCategoria, 10);
      this.http
        .get<NoMedicamento[]>(ENV.api_dev_url + '/nomedicamentoes')
        .subscribe((noMedicamentos: NoMedicamento[]) => {
          noMedicamentos = noMedicamentos.filter(
            q => q.CategoriaId === this.idCategoria
          );
          this.noMedicamentos = noMedicamentos;
        });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Medicamento } from '../models/medicamento.model';

@Component({
  selector: 'app-list-drugs',
  templateUrl: './list-drugs.component.html',
  styleUrls: ['./list-drugs.component.scss']
})
export class ListDrugsComponent implements OnInit {
  public medicamentos: Medicamento[];

  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.http
        .get<Medicamento[]>(ENV.api_dev_url + '/medicamentoes')
        .subscribe((medicamentos: Medicamento[]) => {
          this.medicamentos = medicamentos;
        });
    });
  }
}

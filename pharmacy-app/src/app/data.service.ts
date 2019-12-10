import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{
  constructor() { }
  createDb(){

    let  products =  [
      {  id:  1, image:'assets/images/product_01.png',name:'Bioderma',price:95 },
      {  id:  2, image:'assets/images/product_02.png',name:'Chanca Piedra',price:70 },
      {  id:  3, image:'assets/images/product_03.png',name:'Umcka Cold Care',price:120 },
      {  id:  4, image:'assets/images/product_04.png',name:'Cetyl Pure',price:45},
      {  id:  5, image:'assets/images/product_05.png',name:'CLA Core',price:38 },
      {  id:  5, image:'assets/images/product_06.png',name:'Poo Pourri',price:89 }            
    ];

    return { products };

   }
}
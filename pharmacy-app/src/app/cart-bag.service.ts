import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartBagService {

  public elements: Array<any> = [];

  constructor() {

  }

  public addElement(element: any, quantity: number) {
      this.elements.push([element, quantity]);
      console.dir(this.elements);
  }

  public removeElement(element: any) {
    this.elements.forEach((value) => {
      if (value[0].Id === element.Id) {
          delete this.elements[value];
      }
    });
    console.dir(this.elements);
  }

  public changeQuantity(element: any, quantity: number) {
    this.elements.forEach((value) => {
      if (value[0].Id === element.Id) {
          if (quantity <= 0) {
            delete this.elements[value];
          } else {
            value[1] = quantity;
          }
      }
    });
    console.dir(this.elements);
  }

}

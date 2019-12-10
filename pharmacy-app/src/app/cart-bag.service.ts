import { Injectable } from '@angular/core';
const CART_BAG_ELEMENTS_KEY = 'cart_bag_elements';
const IVA = 22;

@Injectable({
  providedIn: 'root'
})
export class CartBagService {
  public elements: Array<any> = [];

  constructor() {
    if (localStorage.getItem(CART_BAG_ELEMENTS_KEY)) {
      this.elements = JSON.parse(localStorage.getItem(CART_BAG_ELEMENTS_KEY));
    }
  }

  public addElement(element: any, quantity: number) {
    this.elements.push([element, {quantity: quantity}]);
    console.dir(this.elements);
    localStorage.setItem(CART_BAG_ELEMENTS_KEY, JSON.stringify(this.elements));
    alert('Elemento agregado al carrito.');
  }

  public remove(id: number) {
    this.elements = this.elements.filter(item => item[0].Id !== id);
    localStorage.setItem(CART_BAG_ELEMENTS_KEY, JSON.stringify(this.elements));
    console.dir(this.elements);
  }

  public increaseQuantity(id: number) {
    this.elements.map(value => {
      if (value[0].Id === id) {
        value[1].quantity++;
      }
    });
    localStorage.setItem(CART_BAG_ELEMENTS_KEY, JSON.stringify(this.elements));
    console.dir(this.elements);
  }

  public decreseQuantity(id: number) {
    this.elements.map(value => {
      if (value[0].Id === id) {
        value[1].quantity--;
        if (value[1].quantity <= 0) {
          this.elements = this.elements.filter(item => item[0].Id !== id);
        }
      }
    });
    localStorage.setItem(CART_BAG_ELEMENTS_KEY, JSON.stringify(this.elements));
    console.dir(this.elements);
  }

  public getSubTotal() {
    const total = this.getTotal();
    let subTotal = 0;
    if (total > 0) {
      subTotal = total - ((IVA * total) / 100);
    }

    return subTotal;
  }

  public getTotal() {
    let total = 0;
    this.elements.forEach((e) => {
        total += e[0].Precio * e[1].quantity;
    });

    return total;
  }

}

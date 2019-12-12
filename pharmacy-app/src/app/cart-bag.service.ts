import { Injectable } from '@angular/core';
const CART_BAG_ELEMENTS_KEY = 'cart_bag_elements';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment as ENV} from '../environments/environment';
const IVA = 22;

@Injectable({
  providedIn: 'root'
})
export class CartBagService {
  public elements: Array<any> = [];

  constructor(public http: HttpClient) {
    if (localStorage.getItem(CART_BAG_ELEMENTS_KEY)) {
      this.elements = JSON.parse(localStorage.getItem(CART_BAG_ELEMENTS_KEY));
    }
  }

  public addElement(element: any) {
    let alreadyAded = false;
    this.elements.map(value => {
      if (value[0].Id === element.Id) {
        value[1].quantity++;
        alreadyAded = true;
      }
    });

    if (!alreadyAded) {
      this.elements.push([element, {quantity: 1}]);
    }

    localStorage.setItem(CART_BAG_ELEMENTS_KEY, JSON.stringify(this.elements));
    console.dir(this.elements);
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

  public doPayment(userId: number, tarjetaId: number, canitidadRecetasBlancas: number,
                   cantidadRecetasControladas: number, direccion: string) {
    const lineas = [];

    this.elements.forEach(element => {
      lineas.push({Cantidad: element[1].quantity, Monto: 0, Articulo_Id: element[0].Id});
    });

    const factura = {
      UsuarioId: userId,
      TarjetaId: tarjetaId,
      CanitidadRecetasBlancas: canitidadRecetasBlancas,
      CantidadRecetasControladas: cantidadRecetasControladas,
      Delivery: {
        Direccion: direccion,
      },
      Lineas: lineas
    };

    return new Promise((resolve, reject) => {
      this.http.post(ENV.api_dev_url + 'facturas', factura)
      .toPromise().then((response: any) => {
        console.dir(response);
        resolve(true);
        this.elements = [];
        localStorage.removeItem(CART_BAG_ELEMENTS_KEY);
      })
      .catch((reason: any) => {
        console.dir(reason);
        reject(false);
      });
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { CartBagService } from '../cart-bag.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    public cartBagService: CartBagService
  ) {
    if (!this.loginService.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      tarjetaId: ['', Validators.required],
      canitidadRecetasBlancas: ['', Validators.required],
      cantidadRecetasControladas: ['', Validators.required],
      direccion: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }

  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
      return;
    }

    this.loading = true;
    this.cartBagService
      .doPayment(
        this.loginService.userId,
        this.f.tarjetaId.value,
        this.f.canitidadRecetasBlancas.value,
        this.f.cantidadRecetasControladas.value,
        this.f.direccion.value,
      )
      .then(response => {
        alert(
          'Gracias por su compra!. La misma está siendo procesada y será entregada en las próximas 3h.'
        );
        this.loading = false;
        this.router.navigate(['/']);
      })
      .catch(err => {
        alert(
          'Hubo un error en el procesamiento del pago... OJALA ESTO NO LO VEA ARIEL :-).'
        );
        this.loading = false;
      });
  }

  public cuponNotFound() {
    alert('El cupón no es válido!.');
  }
}

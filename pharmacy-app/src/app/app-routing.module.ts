import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HelpComponent } from './help/help.component';
import { ListComponent } from './list/list.component';
import { ListDrugsComponent } from './list-drugs/list-drugs.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'help', component: HelpComponent },
  { path: 'list/:idCategoria', component: ListComponent },
  { path: 'list-drugs', component: ListDrugsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product-details/:idElement', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

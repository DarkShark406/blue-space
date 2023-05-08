import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ComparisionComponent } from './components/pages/comparision/comparision.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { AccountComponent } from './components/pages/account/account.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { CatalogBrandComponent } from './components/pages/catalog-brand/catalog-brand.component';
import { MakePaymentComponent } from './components/pages/make-payment/make-payment.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { BrandProductComponent } from './components/pages/brand-product/brand-product.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: 'comparision', component: ComparisionComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'product/:slug', component: ProductDetailsComponent },
  { path: 'products', component: CatalogComponent },
  { path: 'products/brand/:brand', component: BrandProductComponent },
  { path: 'products/:category/:brand', component: CatalogBrandComponent },
  { path: 'products/:category', component: CatalogComponent },
  { path: 'products/:category/:brand', component: CatalogComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'profile', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ForgotPasswordComponent },
  {
    path: 'make-payment',
    component: MakePaymentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

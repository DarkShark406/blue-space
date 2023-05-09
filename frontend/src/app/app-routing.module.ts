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
import { PolicyComponent } from './components/pages/policy/policy.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';
import { FAQSecurityComponent } from './components/pages/faq-security/faq-security.component';
import { FAQReturnComponent } from './components/pages/faq-return/faq-return.component';
import { FAQWarrantyComponent } from './components/pages/faq-warranty/faq-warranty.component';
import { FAQMoreComponent } from './components/pages/faq-more/faq-more.component';
import { OrderListComponent } from './components/pages/order-list/order-list.component';

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
  { path: 'profile', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ForgotPasswordComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'orders', component: OrderListComponent },
  {
    path: 'orders/:orderId',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'make-payment',
    component: MakePaymentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'policy/security', component: FAQSecurityComponent },
  { path: 'policy/return', component: FAQReturnComponent },
  { path: 'policy/warranty', component: FAQWarrantyComponent },
  { path: 'policy/more', component: FAQMoreComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

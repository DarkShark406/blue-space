import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductComponent } from './components/pages/admin-product/admin-product.component';
import { AdminProductNewComponent } from './components/pages/admin-product-new/admin-product-new.component';
import { AdminProductDetailComponent } from './components/pages/admin-product-detail/admin-product-detail.component';
import { AdminProductCategoryComponent } from './components/pages/admin-product-category/admin-product-category.component';
import { AdminProductUpdateComponent } from './components/pages/admin-product-update/admin-product-update.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AdminOrderComponent } from './components/pages/admin-order/admin-order.component';
import { AdminOrderDetailComponent } from './components/pages/admin-order-detail/admin-order-detail.component';
import { AdminCustomerComponent } from './components/pages/admin-customer/admin-customer.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: '', component: AdminProductComponent, canActivate: [AuthGuard] },

  {
    path: 'product/new',
    component: AdminProductNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/details/:id',
    component: AdminProductDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/update/:id',
    component: AdminProductUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:categoryName',
    component: AdminProductCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    component: AdminOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/details/:id',
    component: AdminOrderDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    component: AdminCustomerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

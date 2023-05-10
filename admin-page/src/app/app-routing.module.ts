import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductComponent } from './components/pages/admin-product/admin-product.component';
import { AdminProductNewComponent } from './components/pages/admin-product-new/admin-product-new.component';
import { AdminProductDetailComponent } from './components/pages/admin-product-detail/admin-product-detail.component';
import { AdminProductCategoryComponent } from './components/pages/admin-product-category/admin-product-category.component';
import { AdminProductUpdateComponent } from './components/pages/admin-product-update/admin-product-update.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { AuthGuard } from './auth/guard/auth.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

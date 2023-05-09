import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductComponent } from './components/pages/admin-product/admin-product.component';
import { AdminProductNewComponent } from './components/pages/admin-product-new/admin-product-new.component';
import { AdminProductDetailComponent } from './components/pages/admin-product-detail/admin-product-detail.component';
import { AdminProductCategoryComponent } from './components/pages/admin-product-category/admin-product-category.component';
import { AdminProductUpdateComponent } from './components/pages/admin-product-update/admin-product-update.component';

const routes: Routes = [
  { path: '', component: AdminProductComponent },
  {
    path: 'product/new',
    component: AdminProductNewComponent,
  },
  {
    path: 'product/details/:id',
    component: AdminProductDetailComponent,
  },
  {
    path: 'product/update/:id',
    component: AdminProductUpdateComponent,
  },
  {
    path: 'products/:category',
    component: AdminProductCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

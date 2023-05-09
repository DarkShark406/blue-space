import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminProductComponent } from './components/pages/admin-product/admin-product.component';
import { AdminProductCategoryComponent } from './components/pages/admin-product-category/admin-product-category.component';
import { AdminProductDetailComponent } from './components/pages/admin-product-detail/admin-product-detail.component';
import { AdminProductNewComponent } from './components/pages/admin-product-new/admin-product-new.component';
import { AdminProductUpdateComponent } from './components/pages/admin-product-update/admin-product-update.component';
import { NavAdminComponent } from './components/partials/nav-admin/nav-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminCategoryComponent } from './components/pages/admin-category/admin-category.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminProductComponent,
    AdminProductCategoryComponent,
    AdminProductDetailComponent,
    AdminProductNewComponent,
    AdminProductUpdateComponent,
    NavAdminComponent,
    AdminCategoryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

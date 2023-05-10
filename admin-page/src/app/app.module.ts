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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminCategoryComponent } from './components/pages/admin-category/admin-category.component';
import { SliderComponent } from './components/partials/slider/slider.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';

import { SwiperModule } from 'swiper/angular';
import { AdminOrderComponent } from './components/pages/admin-order/admin-order.component';
import { AdminOrderDetailComponent } from './components/pages/admin-order-detail/admin-order-detail.component';
import { AuthInterceptor } from './auth/auth.interceptor';

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
    SliderComponent,
    AdminLoginComponent,
    AdminOrderComponent,
    AdminOrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SwiperModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

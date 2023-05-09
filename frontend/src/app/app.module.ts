import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { SearchBarComponent } from './components/partials/search-bar/search-bar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TabsComponent } from './components/partials/tabs/tabs.component';
import { TabComponent } from './components/partials/tab/tab.component';
import { SliderComponent } from './components/partials/slider/slider.component';
import { ComparisionComponent } from './components/pages/comparision/comparision.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { StarsRatingComponent } from './components/partials/stars-rating/stars-rating.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AccountComponent } from './components/pages/account/account.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ListCustomersComponent } from './components/pages/list-customers/list-customers.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';
import { PolicyComponent } from './components/pages/policy/policy.component';
import { ReportsComponent } from './components/pages/reports/reports.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MapComponent } from './components/partials/map/map.component';
import { CatalogBrandComponent } from './components/pages/catalog-brand/catalog-brand.component';

import { MakePaymentComponent } from './components/pages/make-payment/make-payment.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { BrandProductComponent } from './components/pages/brand-product/brand-product.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ContactComponent } from './components/pages/contact/contact.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { FAQSecurityComponent } from './components/pages/faq-security/faq-security.component';
import { FAQReturnComponent } from './components/pages/faq-return/faq-return.component';
import { FAQWarrantyComponent } from './components/pages/faq-warranty/faq-warranty.component';
import { FAQMoreComponent } from './components/pages/faq-more/faq-more.component';
import { OrderListComponent } from './components/pages/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    HomeComponent,
    TabsComponent,
    TabComponent,
    SliderComponent,
    ComparisionComponent,
    ProductDetailsComponent,
    StarsRatingComponent,
    FooterComponent,
    CatalogComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    AboutUsComponent,
    ForgotPasswordComponent,
    ListCustomersComponent,
    MyOrdersComponent,
    PolicyComponent,
    ReportsComponent,
    LoadingComponent,
    MapComponent,
    CatalogBrandComponent,

    MakePaymentComponent,
    ShoppingCartComponent,
    BrandProductComponent,
    ContactComponent,
    PaypalButtonComponent,
    FAQSecurityComponent,
    FAQReturnComponent,
    FAQWarrantyComponent,
    FAQMoreComponent,
    OrderListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    SwiperModule,
    NgbModule,
    MatSnackBarModule,

    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

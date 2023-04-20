import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    NgbModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

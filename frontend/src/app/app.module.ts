import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { SearchBarComponent } from './components/partials/search-bar/search-bar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TabsComponent } from './components/partials/tabs/tabs.component';
import { TabComponent } from './components/partials/tab/tab.component';
import { SliderComponent } from './components/partials/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    HomeComponent,
    TabsComponent,
    TabComponent,
    SliderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SwiperModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

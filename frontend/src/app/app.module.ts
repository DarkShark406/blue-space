import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Faq1Component } from './components/pages/faq1/faq1.component';
import { HttpClientModule } from '@angular/common/http';
import { Faq2Component } from './components/pages/faq2/faq2.component';
import { Faq3Component } from './components/pages/faq3/faq3.component';

@NgModule({
  declarations: [
    AppComponent,
    Faq1Component,
    Faq2Component,
    Faq3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

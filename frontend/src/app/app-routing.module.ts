import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ComparisionComponent } from './components/pages/comparision/comparision.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comparision', component: ComparisionComponent },
  { path: 'products/:slug', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

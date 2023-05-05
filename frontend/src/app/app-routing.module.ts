import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ComparisionComponent } from './components/pages/comparision/comparision.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comparision', component: ComparisionComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'products', component: CatalogComponent },
  { path: 'products/:category', component: CatalogComponent },
  { path: 'products/:category/:brand', component: CatalogComponent },
  { path: 'product/:slug', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

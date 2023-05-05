import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product: Product = new Product();
  constructor(
    private route: ActivatedRoute,
    private productSerivce: ProductService
  ) {
    const id = this.route.snapshot.params['id'];
    productSerivce.getProductById(id).subscribe((d) => {
      this.product = d;
      console.log(this.product);
    });
  }

  images = [
    'https://via.placeholder.com/500x300/FF5733/FFFFFF',
    'https://via.placeholder.com/500x300/C70039/FFFFFF',
    'https://via.placeholder.com/500x300/900C3F/FFFFFF',
    'https://via.placeholder.com/500x300/581845/FFFFFF',
  ];
  show = false;

  toggleCollapsed() {
    this.show = !this.show;
  }
}

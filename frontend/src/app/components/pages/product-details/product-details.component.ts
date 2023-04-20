import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
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

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import SwiperCore, { Keyboard, Autoplay, Pagination, Navigation } from 'swiper';

SwiperCore.use([Keyboard, Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  images = [
    'https://via.placeholder.com/500x300/FF5733/FFFFFF',
    'https://via.placeholder.com/500x300/C70039/FFFFFF',
    'https://via.placeholder.com/500x300/900C3F/FFFFFF',
    'https://via.placeholder.com/500x300/581845/FFFFFF',
  ];
  content = [
    `<div class="category-item">
    <a href="">
      <img src="../assets/images/home/laptop.png" alt="" />
      <p>Laptop</p>
    </a>
  </div>`,
  ];
}

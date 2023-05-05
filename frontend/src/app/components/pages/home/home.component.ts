import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import SwiperCore, { Keyboard, Autoplay, Pagination, Navigation } from 'swiper';

SwiperCore.use([Keyboard, Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  constructor(private homeService: HomeService) {}
  topPhone: any;
  topLaptop: any;
  topKeyboard: any;
  topEarphone: any;
  ngOnInit() {
    this.homeService.getTopSales('phone').subscribe((d) => {
      this.topPhone = d;
    });
    this.homeService.getTopSales('laptop').subscribe((d) => {
      this.topLaptop = d;
    });
    this.homeService.getTopSales('keyboard').subscribe((d) => {
      this.topKeyboard = d;
    });
    this.homeService.getTopSales('earphone').subscribe((d) => {
      this.topEarphone = d;
    });
  }
  log() {
    console.log('click me');
  }
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

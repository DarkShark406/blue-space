import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from 'src/app/interfaces/product';
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
  images = [
    'products/banner/banner1.jpg',
    'products/banner/banner2.jpg',
    'products/banner/banner3.jpg',
    'products/banner/banner4.jpg',
    'products/banner/banner5.jpg',
  ];
  topPhone: any;
  topLaptop: any;
  topKeyboard: any;
  topEarphone: any;
  discountAll: Product[] = [];
  discountPhone: Product[] = [];
  discountLaptop: Product[] = [];
  discountEarphone: Product[] = [];
  tagSinhVien: Product[] = [];

  ngOnInit() {
    this.homeService.getTopSales('phone').subscribe((d) => {
      this.topPhone = d;
      console.log(d[0]);
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
    this.homeService.getProductByTag('sinh-vien-van-phong').subscribe((d) => {
      this.tagSinhVien = d;
    });
    this.homeService.getTopDiscount('all').subscribe((d) => {
      this.discountAll = d;
    });
    this.homeService.getTopDiscount('phone').subscribe((d) => {
      this.discountPhone = d;
    });
    this.homeService.getTopDiscount('laptop').subscribe((d) => {
      this.discountLaptop = d;
    });
    this.homeService.getTopDiscount('earphone').subscribe((d) => {
      this.discountEarphone = d;
    });
  }
}

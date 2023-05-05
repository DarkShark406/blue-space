import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent {
  VietnameseKey = {
    cpu: 'Bộ xử lý',
    operatingSystem: 'Hệ điều hành',
    ram: 'RAM',
    gpu: 'Card đồ họa',
    storage: 'Ổ cứng',
    batteryCapacity: 'Dung lượng Pin',
    'battery-capacity': 'Dung lượng Pin',
    screen: 'Màn hình',
    keyboard: 'Bàn phím',
    bluetooth: 'Bluetooth',
    camera: 'Camera',
    weight: 'Trọng lượng',
    color: 'Màu sắc',
    size: 'Kích thước',
    material: 'Chất liệu',
    core: 'Số nhân',
    simSlot: 'Khe sim',
    cable: 'Dây cáp',
    earphone: 'Tai nghe',
    model: 'Mẫu',
    connection: 'Kết nối',
    connectionDistance: 'Khoảng cách kết nối',
    switch: 'Switch',
    type: 'Loại',
    numberOfKeys: 'Số phím',
    ledLight: 'Đèn led',
    otherFunction: 'Các chức năng khác',
    DPI: 'Độ phân giải',
    led: 'Led',
    batteryTime: 'Thời gian pin',
    frequency: 'Tần số',
    impedance: 'Trở kháng',
    compatible: 'Tương thích',
    micrphone: 'Microphone',
    language: 'Ngôn ngữ',
    numberOfUser: 'Số người dùng',
    operationSystem: 'Hệ điều hành',
    pen: 'Bút vẽ',
    materialKeycaps: 'Chất liệu phím',
  };

  product: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private productSerivce: ProductService
  ) {
    const id = this.route.snapshot.params['id'];
    productSerivce.getProductById(id).subscribe((d) => {
      this.product = d;
    });
  }

  show = false;
  toggleCollapsed() {
    this.show = !this.show;
  }
}

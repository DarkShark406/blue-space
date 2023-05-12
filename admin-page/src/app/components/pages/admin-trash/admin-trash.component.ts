import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-trash',
  templateUrl: './admin-trash.component.html',
  styleUrls: ['./admin-trash.component.css'],
})
export class AdminTrashComponent {
  trash: boolean = true;
  deletedProduct: any;
  constructor(
    private _service: AdminProductService,
    private location: Location
  ) {}
  getDeletedProduct() {
    this._service.getDeletedProduct().subscribe((d) => {
      this.deletedProduct = d;
    });
  }
  restoreProduct(id: string) {
    this._service.restoreProduct(id).subscribe((d) => {
      alert('Khôi phục thành công');
    });
    window.location.reload();
  }

  permanentDeleteProduct(id: string) {
    this._service.permanentDeleteProduct(id).subscribe(
      (response) => {
        alert('Đã xóa');
        window.location.reload();
      },
      (error) => {
        console.error(error);
        alert('Có lỗi xảy ra');
      }
    );
  }

  ngOnInit() {
    this.getDeletedProduct();
  }

  goBack() {
    this.location.back();
  }
}

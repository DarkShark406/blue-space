import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { AdminProductService } from 'src/app/services/admin-product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-product-new',
  templateUrl: './admin-product-new.component.html',
  styleUrls: ['./admin-product-new.component.css'],
})
export class AdminProductNewComponent {
  product = new Product();
  [x: string]: any;
  products: any;
  errMessage: string = '';
  isValidSubmit = true;

  constructor(
    private _service: AdminProductService,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errMessage;
      },
    });

    this.deleteImages();
  }

  goBack() {
    this.location.back();
  }

  postProduct() {
    for (let i = 0; i < this.fileNameImages.length; i++) {
      this.product.productImage.push(
        'products/' + this.product.productID + '/' + this.fileNameImages[i]
      );
    }
    this._service.postProduct(this.product).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    // Up hình vào products image
    const productImage = document.getElementById(
      'product-image'
    ) as HTMLInputElement;
    const files = productImage.files;
    this.fileUpload = files;
    if (files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const upload$ = this.http
        .post(
          'http://localhost:5000/images/upload/' + this.product.productID,
          formData,
          {
            reportProgress: true,
            observe: 'events',
            responseType: 'text',
          }
        )
        .pipe(finalize(() => this.reset()));
      this.uploadSub = upload$.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
      });
    }

    // Về lại trang danh sách sản phẩm
    this.router.navigate(['']);
  }

  // Thông báo invalid
  clearClassInvalid(id: string) {
    document.getElementById(id)?.classList.remove('invalid');
  }

  addClassInvalid(id: string) {
    document.getElementById(id)?.classList.add('invalid');
    document.getElementById(id)?.focus();
  }

  // --------------------Xử lý upload file images-----------
  fileNameImages: Array<string> = []; // Lưu tên hình

  fileUpload: any; // Lưu các file up load
  @Input() requiredFileType: any;
  uploadProgress: number = 0;
  uploadSub: Subscription = new Subscription();

  onFileSelected(event: any) {
    const files = event.target.files;
    this.fileUpload = files;
    if (files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const upload$ = this.http
        .post('http://localhost:5000/images/upload-temp', formData, {
          reportProgress: true,
          observe: 'events',
          responseType: 'text',
        })
        .pipe(finalize(() => this.reset()));
      this.uploadSub = upload$.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
      });
    }

    this.openModal();
  }

  // Xóa ảnh
  deleteImages() {
    this.http
      .delete<boolean>('http://localhost:5000/images/delete-temp')
      .subscribe(
        (response) => {
          if (response === true) {
            console.log('Đã xóa');
          }
        },
        (error) => {
          console.error(error);
          console.log('Có lỗi xảy ra');
        }
      );
    this.fileNameImages = [];
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }

  sentImageToHTxML() {
    console.log(this.fileNameImages);
    for (let i = 0; i < this.fileUpload.length; i++) {
      this.fileNameImages.push(this.fileUpload[i].name);
    }
  }

  // ------------------- Xử lý modal đếm ngược -------------
  openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';

      // Đếm ngược từ 3
      var count = 2;
      var countdownElement = document.getElementById('countdown');

      var countdownInterval = setInterval(function () {
        if (countdownElement) {
          countdownElement.textContent = count.toString();
          count--;
          if (count < 0) {
            clearInterval(countdownInterval);
            document
              .getElementById('closeModalBtn')
              ?.removeAttribute('disabled');
          }
        }
      }, 1000);

      document
        .getElementById('closeModalBtn')
        ?.addEventListener('click', function () {
          modal.style.display = 'none';
        });
    }
  }

  // ------------------- Xử lý submit ----------------------

  checkMainValue() {
    // Tags
    const productTagsInput = document.getElementById(
      'product-tags'
    ) as HTMLInputElement;
    const productTagsValue = productTagsInput.value.trim();

    if (this.product.categoryId == 0) {
      this.addClassInvalid('product-category');
      this.isValidSubmit = false;
    }
    if (this.product.productID == '') {
      this.addClassInvalid('product-id');
      this.isValidSubmit = false;
    }
    if (this.product.productName == '') {
      this.addClassInvalid('product-name');
      this.isValidSubmit = false;
    }
    if (this.product.productBrand == '') {
      this.addClassInvalid('product-brand');
      this.isValidSubmit = false;
    }
    if (this.product.productPrice == 0) {
      this.addClassInvalid('product-price');
      this.isValidSubmit = false;
    }

    if (this.product.productRegion == '') {
      this.addClassInvalid('product-region');
      this.isValidSubmit = false;
    }
    if (this.product.warrantyPeriod == 0) {
      this.addClassInvalid('warranty-period');
      this.isValidSubmit = false;
    }
    if (productTagsValue == '') {
      this.addClassInvalid('product-tags');
      this.isValidSubmit = false;
    } else {
      this.product.productTags = productTagsValue.split(',');
      console.log(this.product.productTags);
    }

    if (this.product.description == '') {
      this.addClassInvalid('product-description');
      this.isValidSubmit = false;
    }
    if (this.fileNameImages.length == 0) {
      this.isValidSubmit = false;
      alert('Cần có hình minh họa');
    }
  }

  // thông tin chi tiết laptop
  onSubmitLaptop() {
    console.log('submit laptop');

    // Color
    const colorInput = document.getElementById('color') as HTMLInputElement;
    const colorValue = colorInput.value.trim();

    this.checkMainValue();

    if (this.product.specifications.cpu == '') {
      this.addClassInvalid('cpu');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.screen == '') {
      this.addClassInvalid('screen');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.storage == '') {
      this.addClassInvalid('storage');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.ram == '') {
      this.addClassInvalid('ram');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.operatingSystem == '') {
      this.addClassInvalid('operatingSystem');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.batteryCapacity == '') {
      this.addClassInvalid('battery-capacity');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.keyboard == '') {
      this.addClassInvalid('keyboard');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.bluetooth == '') {
      this.addClassInvalid('bluetooth');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.camera == '') {
      this.addClassInvalid('camera');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.weight == '') {
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.size == '') {
      this.addClassInvalid('size');
      this.isValidSubmit = false;
    }
    if (colorValue == '') {
      this.addClassInvalid('color');
      this.isValidSubmit = false;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }
    if (this.product.specifications.material == '') {
      this.addClassInvalid('material');
      this.isValidSubmit = false;
    } else this.isValidSubmit == true;

    if (this.isValidSubmit) {
      this.postProduct();
    } else {
      alert('Nhập thiếu thông tin');
    }
  }

  //thông tin chi tiết Phone
  onSubmitPhone() {
    // Color
    const colorInput = document.getElementById('color') as HTMLInputElement;
    const colorValue = colorInput.value.trim();

    // Earphone, Cable
    const earphoneYes = document.getElementById(
      'earphone-yes'
    ) as HTMLInputElement;
    const earphoneNo = document.getElementById(
      'earphone-no'
    ) as HTMLInputElement;
    const cableYes = document.getElementById('cable-yes') as HTMLInputElement;
    const cableNo = document.getElementById('cable-no') as HTMLInputElement;

    const messageErroCable = document.getElementById(
      'cable-error-message'
    ) as HTMLInputElement;
    const messageErroEarphone = document.getElementById(
      'earphone-error-message'
    ) as HTMLInputElement;

    earphoneYes.onchange = function () {
      messageErroEarphone.style.display = 'none';
    };
    earphoneNo.onchange = function () {
      messageErroEarphone.style.display = 'none';
    };
    cableYes.onchange = function () {
      messageErroCable.style.display = 'none';
    };
    cableNo.onchange = function () {
      messageErroCable.style.display = 'none';
    };

    this.checkMainValue();

    if (this.product.specifications.cpu == '') {
      this.addClassInvalid('cpu');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.screen == '') {
      this.addClassInvalid('screen');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.storage == '') {
      this.addClassInvalid('storage');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.ram == '') {
      this.addClassInvalid('ram');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.core == 0) {
      this.addClassInvalid('core');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.operatingSystem == '') {
      this.addClassInvalid('operatingSystem');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.batteryCapacity == '') {
      this.addClassInvalid('batteryCapacity');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.simSlot == 0) {
      this.addClassInvalid('simSlot');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.bluetooth == '') {
      this.addClassInvalid('bluetooth');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.camera == '') {
      this.addClassInvalid('camera');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.weight == '') {
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
    }
    if (colorValue == '') {
      this.addClassInvalid('color');
      this.isValidSubmit = false;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }
    if (this.product.specifications.material == '') {
      this.addClassInvalid('material');
      this.isValidSubmit = false;
    }
    if (cableYes.checked == false && cableNo.checked == false) {
      messageErroCable.style.display = 'block';
      this.isValidSubmit = false;
    }
    if (earphoneYes.checked == false && earphoneNo.checked == false) {
      messageErroEarphone.style.display = 'block';
      this.isValidSubmit = false;
    } else this.isValidSubmit == true;

    if (this.isValidSubmit) {
      this.postProduct();
    } else {
      alert('Nhập thiếu thông tin');
    }
  }

  //thông tin chi tiết Tablet
  onSubmitTabet() {
    const penYes = document.getElementById('pen-yes') as HTMLInputElement;
    const penNo = document.getElementById('pen-no') as HTMLInputElement;
    const cableYes = document.getElementById('cable-yes') as HTMLInputElement;
    const cableNo = document.getElementById('cable-no') as HTMLInputElement;

    const messageErroCable = document.getElementById(
      'cable-error-message'
    ) as HTMLInputElement;
    const messageErroPen = document.getElementById(
      'pen-error-message'
    ) as HTMLInputElement;

    penYes.onchange = function () {
      messageErroPen.style.display = 'none';
    };
    penNo.onchange = function () {
      messageErroPen.style.display = 'none';
    };
    cableYes.onchange = function () {
      messageErroCable.style.display = 'none';
    };
    cableNo.onchange = function () {
      messageErroCable.style.display = 'none';
    };

    // Color
    const colorInput = document.getElementById('color') as HTMLInputElement;
    const colorValue = colorInput.value.trim();

    this.checkMainValue();
    if (this.product.specifications.cpu == '') {
      this.addClassInvalid('cpu');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.screen == '') {
      this.addClassInvalid('screen');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.storage == '') {
      this.addClassInvalid('storage');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.ram == '') {
      this.addClassInvalid('ram');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.core == 0) {
      this.addClassInvalid('core');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.operatingSystem == '') {
      this.addClassInvalid('operatingSystem');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.batteryCapacity == '') {
      this.addClassInvalid('battery-capacity');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.simSlot == 0) {
      this.addClassInvalid('sim-slot');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.bluetooth == '') {
      this.addClassInvalid('bluetooth');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.camera == '') {
      this.addClassInvalid('camera');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.weight == '') {
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
    }
    if (colorValue == '') {
      this.addClassInvalid('color');
      this.isValidSubmit = false;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }
    if (this.product.specifications.material == '') {
      this.addClassInvalid('material');
      this.isValidSubmit = false;
    }
    if (cableYes.checked == false && cableNo.checked == false) {
      messageErroCable.style.display = 'block';
      this.isValidSubmit = false;
    }
    if (penYes.checked == false && penNo.checked == false) {
      messageErroPen.style.display = 'block';
      this.isValidSubmit = false;
    } else this.isValidSubmit == true;

    if (this.isValidSubmit) {
      this.postProduct();
    } else {
      alert('Nhập thiếu thông tin');
    }
  }

  //thông tin chi tiết earphone
  onSubmitEarphone() {
    // Color
    const colorInput = document.getElementById('color') as HTMLInputElement;
    const colorValue = colorInput.value.trim();

    this.checkMainValue();

    if (this.product.specifications.model == '') {
      this.addClassInvalid('model');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.type == '') {
      this.addClassInvalid('type');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.weight == '') {
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.batteryTime == '') {
      this.addClassInvalid('batteryTime');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.connection == '') {
      this.addClassInvalid('connection');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.connectionDistance == '') {
      this.addClassInvalid('connectionDistance');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.frequency == '') {
      this.addClassInvalid('frequency');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.impedance == '') {
      this.addClassInvalid('impedance');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.compatible == '') {
      this.addClassInvalid('compatible');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.micrphone == '') {
      this.addClassInvalid('micrphone');
      this.isValidSubmit = false;
    }
    if (colorValue == '') {
      this.addClassInvalid('color');
      this.isValidSubmit = false;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }

    if (this.product.specifications.size == '') {
      this.addClassInvalid('size');
      this.isValidSubmit = false;
    } else this.isValidSubmit == true;

    if (this.isValidSubmit) {
      this.postProduct();
    } else {
      alert('Nhập thiếu thông tin');
    }
  }

  //thông tin chi tiết mouse
  onSubmitMouse() {
    // Color
    const colorInput = document.getElementById('color') as HTMLInputElement;
    const colorValue = colorInput.value.trim();

    this.checkMainValue();
    if (this.product.specifications.DPI == '') {
      this.addClassInvalid('DPI');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.connection == '') {
      this.addClassInvalid('connection');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.batteryCapacity == '') {
      this.addClassInvalid('batteryCapacityMouse');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.weight == '') {
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
    }
    if (colorValue == '') {
      this.addClassInvalid('color');
      this.isValidSubmit = false;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }
    if (this.product.specifications.led == '') {
      this.addClassInvalid('led');
      this.isValidSubmit = false;
    } else this.isValidSubmit == true;

    if (this.isValidSubmit) {
      this.postProduct();
    } else {
      alert('Nhập thiếu thông tin');
    }
  }

  //thông tin chi tiết keyboard
  onSubmitKeyboard() {
    this.checkMainValue();
    if (this.product.specifications.model == '') {
      this.addClassInvalid('model');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.connection == '') {
      this.addClassInvalid('connection');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.connectionDistance == '') {
      this.addClassInvalid('connectionDistance');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.switch == '') {
      this.addClassInvalid('switch');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.type == '') {
      this.addClassInvalid('type');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.numberOfKeys == '') {
      this.addClassInvalid('numberOfKeys');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.ledLight == '') {
      this.addClassInvalid('ledLight');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.materialKeycaps == '') {
      this.addClassInvalid('materialKeycaps');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.otherFunction == '') {
      this.addClassInvalid('otherFunction');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.size == '') {
      this.addClassInvalid('size');
      this.isValidSubmit = false;
    }

    if (this.isValidSubmit) {
      this.postProduct();
    } else {
      alert('Nhập thiếu thông tin');
    }
  }

  //thông tin chi tiết application
  onSubmitApplication() {
    this.checkMainValue();

    if (this.product.specifications.language == '') {
      this.addClassInvalid('language');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.type == '') {
      this.addClassInvalid('type');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.numberOfUser == 0) {
      this.addClassInvalid('numberOfUser');
      this.isValidSubmit = false;
    }
    if (this.product.specifications.operationSystem == '') {
      this.addClassInvalid('operationSystem');
      this.isValidSubmit = false;
    } else this.isValidSubmit == true;

    if (this.isValidSubmit) {
      this.postProduct();
    } else {
      alert('Nhập thiếu thông tin');
    }
  }
}

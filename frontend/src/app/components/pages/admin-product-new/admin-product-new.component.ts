import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { AdminProductService } from 'src/app/services/admin-product.service';

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

  constructor(private _service: AdminProductService, private router: Router) {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errMessage;
      },
    });
  }
  postProduct() {
    this._service.postProduct(this.product).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.router.navigate(['admin-product']);
  }

  // Thông báo invalid
  clearClassInvalid(id: string) {
    document.getElementById(id)?.classList.remove('invalid');
  }

  addClassInvalid(id: string) {
    document.getElementById(id)?.classList.add('invalid');
    document.getElementById(id)?.focus();
  }

  // thông tin chi tiết laptop
  onSubmitLaptop() {
    // Tags
    const productTagsInput = document.getElementById(
      'product-tags'
    ) as HTMLInputElement;
    const productTagsValue = productTagsInput.value.trim();

    // Color
    const colorInput = document.getElementById('color') as HTMLInputElement;
    const colorValue = colorInput.value.trim();

    if (this.product.categoryId == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-category');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productName == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-name');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productBrand == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-brand');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productPrice == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-price');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productDiscount == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-discount');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productRegion == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-region');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.warrantyPeriod == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('warranty-period');
      this.isValidSubmit = false;
      return;
    }
    if (productTagsValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-tags');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.productTags = productTagsValue.split(',');
      console.log(this.product.productTags);
    }

    // if (this.product.productImage == '') {
    //   alert('Thiếu thông tin');
    //   this.addClassInvalid('product-image');
    //   this.isValidSubmit = false;
    //   return;
    // }
    if (this.product.description == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('description');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.cpu == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('cpu');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.screen == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('screen');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.storage == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('storage');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.ram == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('ram');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.operatingSystem == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('operatingSystem');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.batteryCapacity == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('battery-capacity');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.keyboard == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('keyboard');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.bluetooth == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('bluetooth');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.camera == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('camera');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.weight == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.size == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('size');
      this.isValidSubmit = false;
      return;
    }
    if (colorValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('color');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }
    if (this.product.specifications.material == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('material');
      this.isValidSubmit = false;
      return;
    } else this.isValidSubmit == true;
    alert('Lưu thành công');
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

    const productTagsInput = document.getElementById(
      'product-tags'
    ) as HTMLInputElement;

    const productTagsValue = productTagsInput.value.trim();

    if (this.product.categoryId == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-category');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productName == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-name');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productBrand == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-brand');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productPrice == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-price');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productDiscount == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-discount');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productRegion == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-region');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.warrantyPeriod == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('warranty-period');
      this.isValidSubmit = false;
      return;
    }
    if (productTagsValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-tags');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.productTags = productTagsValue.split(',');
      console.log(this.product.productTags);
    }

    // if (this.product.productImage == '') {
    //   alert('Thiếu thông tin');
    //   this.addClassInvalid('product-image');
    //   this.isValidSubmit = false;
    //   return;
    // }
    if (this.product.description == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('description');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.cpu == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('cpu');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.screen == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('screen');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.storage == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('storage');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.ram == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('ram');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.core == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('core');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.operatingSystem == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('core');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.batteryCapacity == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('batteryCapacity');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.simSlot == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('simSlot');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.bluetooth == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('bluetooth');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.camera == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('camera');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.weight == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
      return;
    }
    if (colorValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('color');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }
    if (this.product.specifications.material == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('material');
      this.isValidSubmit = false;
      return;
    }
    if (cableYes.checked == false && cableNo.checked == false) {
      alert('Thiếu thông tin');
      messageErroCable.style.display = 'block';
      this.isValidSubmit = false;
      return;
    }
    if (earphoneYes.checked == false && earphoneNo.checked == false) {
      alert('Thiếu thông tin');
      messageErroEarphone.style.display = 'block';
      this.isValidSubmit = false;
      return;
    } else this.isValidSubmit == true;
    alert('Lưu thành công');
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

    // Tags
    const productTagsInput = document.getElementById(
      'product-tags'
    ) as HTMLInputElement;

    const productTagsValue = productTagsInput.value.trim();

    if (this.product.categoryId == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-category');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productName == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-name');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productBrand == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-brand');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productPrice == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-price');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productDiscount == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-discount');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productRegion == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-region');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.warrantyPeriod == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('warranty-period');
      this.isValidSubmit = false;
      return;
    }
    if (productTagsValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-tags');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.productTags = productTagsValue.split(',');
      console.log(this.product.productTags);
    }

    // if (this.product.productImage == '') {
    //   alert('Thiếu thông tin');
    //   this.addClassInvalid('product-image');
    //   this.isValidSubmit = false;
    //   return;
    // }
    if (this.product.description == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('description');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.cpu == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('cpu');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.screen == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('screen');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.storage == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('storage');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.ram == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('ram');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.core == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('core');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.operatingSystem == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('core');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.batteryCapacity == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('batteryCapacity');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.simSlot == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('simSlot');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.bluetooth == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('bluetooth');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.camera == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('camera');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.weight == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
      return;
    }
    if (colorValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('color');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }
    if (this.product.specifications.material == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('material');
      this.isValidSubmit = false;
      return;
    }
    if (cableYes.checked == false && cableNo.checked == false) {
      alert('Thiếu thông tin');
      messageErroCable.style.display = 'block';
      this.isValidSubmit = false;
      return;
    }
    if (penYes.checked == false && penNo.checked == false) {
      alert('Thiếu thông tin');
      messageErroPen.style.display = 'block';
      this.isValidSubmit = false;
      return;
    } else this.isValidSubmit == true;
    alert('Lưu thành công');
  }

  //thông tin chi tiết earphone
  onSubmitEarphone() {
    // Color
    const colorInput = document.getElementById('color') as HTMLInputElement;
    const colorValue = colorInput.value.trim();

    //  Tags
    const productTagsInput = document.getElementById(
      'product-tags'
    ) as HTMLInputElement;
    const productTagsValue = productTagsInput.value.trim();

    if (this.product.categoryId == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-category');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productName == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-name');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productBrand == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-brand');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productPrice == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-price');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productDiscount == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-discount');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productRegion == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-region');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.warrantyPeriod == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('warranty-period');
      this.isValidSubmit = false;
      return;
    }
    if (productTagsValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-tags');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.productTags = productTagsValue.split(',');
      console.log(this.product.productTags);
    }

    // if (this.product.productImage == '') {
    //   alert('Thiếu thông tin');
    //   this.addClassInvalid('product-image');
    //   this.isValidSubmit = false;
    //   return;
    // }
    if (this.product.description == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('description');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.model == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('model');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.type == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('type');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.weight == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.batteryTime == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('batteryTime');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.connection == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('connection');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.connectionDistance == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('connectionDistance');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.frequency == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('frequency');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.impedance == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('impedance');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.compatible == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('compatible');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.micrphone == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('micrphone');
      this.isValidSubmit = false;
      return;
    }
    if (colorValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('color');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }

    if (this.product.specifications.size == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('size');
      this.isValidSubmit = false;
      return;
    } else this.isValidSubmit == true;
    alert('Lưu thành công');
  }

  //thông tin chi tiết mouse
  onSubmitMouse() {
    // Color
    const colorInput = document.getElementById('color') as HTMLInputElement;
    const colorValue = colorInput.value.trim();

    // Tags
    const productTagsInput = document.getElementById(
      'product-tags'
    ) as HTMLInputElement;

    const productTagsValue = productTagsInput.value.trim();

    if (this.product.categoryId == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-category');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productName == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-name');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productBrand == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-brand');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productPrice == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-price');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productDiscount == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-discount');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productRegion == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-region');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.warrantyPeriod == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('warranty-period');
      this.isValidSubmit = false;
      return;
    }
    if (productTagsValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-tags');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.productTags = productTagsValue.split(',');
      console.log(this.product.productTags);
    }

    // if (this.product.productImage == '') {
    //   alert('Thiếu thông tin');
    //   this.addClassInvalid('product-image');
    //   this.isValidSubmit = false;
    //   return;
    // }
    if (this.product.description == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('description');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.DPI == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('DPI');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.connection == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('connection');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.batteryCapacity == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('batteryCapacity');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.weight == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('weight');
      this.isValidSubmit = false;
      return;
    }
    if (colorValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('color');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.specifications.color = colorValue.split(',');
      console.log(this.product.specifications.color);
    }
    if (this.product.specifications.led == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('led');
      this.isValidSubmit = false;
      return;
    } else this.isValidSubmit == true;
    alert('Lưu thành công');
  }

  //thông tin chi tiết keyboard
  onSubmitKeyboard() {
    const productTagsInput = document.getElementById(
      'product-tags'
    ) as HTMLInputElement;

    const productTagsValue = productTagsInput.value.trim();

    if (this.product.categoryId == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-category');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productName == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-name');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productBrand == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-brand');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productPrice == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-price');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productDiscount == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-discount');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productRegion == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-region');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.warrantyPeriod == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('warranty-period');
      this.isValidSubmit = false;
      return;
    }
    if (productTagsValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-tags');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.productTags = productTagsValue.split(',');
      console.log(this.product.productTags);
    }

    // if (this.product.productImage == '') {
    //   alert('Thiếu thông tin');
    //   this.addClassInvalid('product-image');
    //   this.isValidSubmit = false;
    //   return;
    // }
    if (this.product.description == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('description');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.model == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('model');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.connection == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('connection');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.connectionDistance == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('connectionDistance');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.switch == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('switch');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.type == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('type');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.numberOfKeys == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('numberOfKeys');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.ledLight == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('ledLight');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.materialKeycaps == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('materialKeycaps');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.otherFunction == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('otherFunction');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.size == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('material');
      this.isValidSubmit = false;
      return;
    } else this.isValidSubmit == true;
    alert('Lưu thành công');
  }

  //thông tin chi tiết application
  onSubmitApplication() {
    const productTagsInput = document.getElementById(
      'product-tags'
    ) as HTMLInputElement;

    const productTagsValue = productTagsInput.value.trim();

    if (this.product.categoryId == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-category');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productName == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-name');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productBrand == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-brand');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productPrice == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-price');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productDiscount == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-discount');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.productRegion == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-region');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.warrantyPeriod == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('warranty-period');
      this.isValidSubmit = false;
      return;
    }
    if (productTagsValue == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('product-tags');
      this.isValidSubmit = false;
      return;
    } else {
      this.product.productTags = productTagsValue.split(',');
      console.log(this.product.productTags);
    }

    // if (this.product.productImage == '') {
    //   alert('Thiếu thông tin');
    //   this.addClassInvalid('product-image');
    //   this.isValidSubmit = false;
    //   return;
    // }
    if (this.product.description == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('description');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.language == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('language');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.type == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('type');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.numberOfUser == 0) {
      alert('Thiếu thông tin');
      this.addClassInvalid('numberOfUser');
      this.isValidSubmit = false;
      return;
    }
    if (this.product.specifications.operationSystem == '') {
      alert('Thiếu thông tin');
      this.addClassInvalid('operationSystem');
      this.isValidSubmit = false;
      return;
    } else this.isValidSubmit == true;
    alert('Lưu thành công');
  }
}

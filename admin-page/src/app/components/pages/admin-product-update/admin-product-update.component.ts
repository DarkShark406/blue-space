import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { AdminProductService } from 'src/app/services/admin-product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css'],
})
export class AdminProductUpdateComponent {
  product = new Product();
  products: any;
  errMessage: string = '';
  isValidSubmit = true;

  constructor(
    private _service: AdminProductService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    // Get id of product
    this.product.id = this.route.snapshot.params['id'];

    this._service.getProductById(this.product.id).subscribe({
      next: (data) => (this.product = data),
      error: (err) => (this.errMessage = err),
    });

    this.deleteImages();
  }

  goBack() {
    this.location.back();
  }

  putProduct() {
    for (let i = 0; i < this.fileNameImages.length; i++) {
      this.product.productImage.push(
        'products/' + this.product.productID + '/' + this.fileNameImages[i]
      );
    }
    this._service.putProduct(this.product).subscribe({
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
      .get<boolean>('http://localhost:5000/images/delete-temp')
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

    this.product.productImage = [];
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

  // -----------Xử lý submit

  // thông tin chi tiết laptop
  onSubmitLaptop() {
    if (this.isValidSubmit) {
      this.putProduct();
    }
    this.router.navigate(['']);
  }

  //thông tin chi tiết Phone
  onSubmitPhone() {
    if (this.isValidSubmit) {
      this.putProduct();
    }
    this.router.navigate(['']);
  }

  //thông tin chi tiết Tablet
  onSubmitTabet() {
    if (this.isValidSubmit) {
      this.putProduct();
    }
    this.router.navigate(['']);
  }

  //thông tin chi tiết earphone
  onSubmitEarphone() {
    if (this.isValidSubmit) {
      this.putProduct();
    }
    this.router.navigate(['']);
  }

  //thông tin chi tiết mouse
  onSubmitMouse() {
    if (this.isValidSubmit) {
      this.putProduct();
    }
    this.router.navigate(['']);
  }

  //thông tin chi tiết keyboard
  onSubmitKeyboard() {
    if (this.isValidSubmit) {
      this.putProduct();
    }
    this.router.navigate(['']);
  }

  //thông tin chi tiết application
  onSubmitApplication() {
    if (this.isValidSubmit) {
      this.putProduct();
    }
    this.router.navigate(['']);
  }
}

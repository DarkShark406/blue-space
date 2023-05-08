import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter } from 'src/app/interfaces/filter';
import { Product } from 'src/app/interfaces/product';
import { CartProductService } from 'src/app/services/cart-product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'app-catalog-brand',
  templateUrl: './catalog-brand.component.html',
  styleUrls: ['./catalog-brand.component.css'],
})
export class CatalogBrandComponent implements OnInit {
  products: any;
  errorMessage: string = '';
  typeShowList = true; // Kiểu hiển thị danh sách sản phẩm: true = grid, false = horizontal
  typeSort: string = ''; // Kiểu sort: asc: tăng dần, desc: giảm dần
  categoryName: string = '';
  brand: string = '';

  pageSize = 20;
  currentPage = 1;
  pageNumbers: number[] = [];

  filter = new Filter(); // Biến filter

  constructor(
    private _service: ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartProductService,
    private searchBarService: SearchBarService
  ) {}
  ngOnInit() {
    this.categoryName = this.route.snapshot.params['category'];
    this.brand = this.route.snapshot.params['brand'];

    // Set thẳng brand cho filter
    this.filter.brand.push(this.brand);

    if (this.categoryName) {
      this._service
        .getProductForCategoryAndBrand(this.categoryName, this.brand)
        .subscribe({
          next: (data) => (this.products = data),
          error: (err) => (this.errorMessage = err),
        });

      // Tính số trang
      const totalPages = Math.ceil(this.products.length / this.pageSize);
    } else {
      this._service.getAllProduct().subscribe((d) => {
        this.products = d.slice(0, 100);
      });
    }
  }

  // Xử lý nút
  addToCart(product: Product, quantity: number) {
    const item = Object.assign({}, product);
    item.specifications = Object.assign({}, product.specifications);
    if (item.specifications.color != undefined) {
      item.specifications.color = [product.specifications.color[0]];
    }

    this.cartService.addProductToCart(item, quantity);

    // Chuyển qua trang shopping cart
    this.router.navigate(['shopping-cart']);
  }
  suggestions: any;
  searchTerm = '';
  id1 = '';
  getProductCompare() {
    this.searchBarService.getData(this.searchTerm).subscribe((d) => {
      this.suggestions = d.slice(0, 5);
    });
  }
  compare(id: string) {
    this.router.navigateByUrl('/comparision?id1=' + this.id1 + '&id2=' + id);
  }
  popUp: boolean = false;
  onPopupClick(event: any) {
    if (event.target.classList.contains('popup-container')) {
      this.closePopup();
    }
  }

  openPopup(id: string) {
    this.id1 = id;
    this.popUp = true;
  }
  closePopup() {
    this.popUp = false;
  }

  // =========================================================================================

  getProductsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.products.length / this.pageSize); // Tính số trang dựa trên số lượng sản phẩm và kích thước trang
    return Array(totalPages)
      .fill(0)
      .map((x, i) => i + 1); // Tạo một mảng các số trang từ 2 đến totalPages
  }

  goToPage(page: number, event: any) {
    this.currentPage = page;
    const target = event.target || event.srcElement;
    const allBtnPages = document.querySelectorAll('.button-pages button');
    if (allBtnPages) {
      for (let i = 0; i < allBtnPages.length; i++) {
        allBtnPages[i].classList.remove('active');
      }
      target.classList.add('active');
    }
  }

  // Conver price thành kiểu đơn vị tiền tệ
  // 12600000 --> 12.600.000
  convertNumber(price: number) {
    const integerPart = Math.floor(price).toString();
    const decimalPart = (price % 1).toFixed(0);
    const integerPartWithSeparator = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );

    return decimalPart === '0'
      ? integerPartWithSeparator
      : `${integerPartWithSeparator}.${decimalPart}`;
  }

  toggleActiveClassBrandAndColor(brand: string) {
    const item = document.querySelector('#' + brand);
    if (item) {
      item.classList.toggle('active');
    }
  }

  toggleActiveClassChoice(choice: string) {
    const item = document.querySelector('#' + choice);
    if (item) {
      item.parentElement?.classList.toggle('active');
    }
  }

  addActiveClassPrice(choice: string) {
    const choicePriceElement = document.getElementById(choice);
    if (choicePriceElement?.parentElement?.classList.contains('active')) {
      choicePriceElement?.parentElement?.classList.remove('active');
      return;
    }
    const filterItemPriceAll = document.querySelectorAll(
      '.filter-list-price .filter-item'
    );
    if (filterItemPriceAll) {
      for (let i = 0; i < filterItemPriceAll.length; i++) {
        filterItemPriceAll[i].classList.remove('active');
      }
    }
    // Add class active cho filter
    choicePriceElement?.parentElement?.classList.add('active');
  }

  // Chế độ hiển thị sản phẩm
  clickGridTypeList() {
    if (!this.typeShowList) {
      this.typeShowList = !this.typeShowList;
      const gridTypeList = document.getElementById('grid-type-list');
      if (gridTypeList) {
        gridTypeList.classList.add('active');
      }
      const horizontalTypeList = document.getElementById(
        'horizontal-type-list'
      );
      if (horizontalTypeList) {
        horizontalTypeList.classList.remove('active');
      }
    }
  }

  // Chế độ hiển thị sản phẩm
  clickHorizontalTypeList() {
    if (this.typeShowList) {
      this.typeShowList = !this.typeShowList;
      const gridTypeList = document.getElementById('grid-type-list');
      if (gridTypeList) {
        gridTypeList.classList.remove('active');
      }
      const horizontalTypeList = document.getElementById(
        'horizontal-type-list'
      );
      if (horizontalTypeList) {
        horizontalTypeList.classList.add('active');
      }
    }
  }

  // Xóa tất cả filter
  deleteFilter() {
    const allChoiceList = document.querySelectorAll('.filter-item .choice');
    if (allChoiceList) {
      for (let i = 0; i < allChoiceList.length; i++) {
        allChoiceList[i].parentElement?.classList.remove('active');
      }
    }

    const allColorList = document.querySelectorAll('.filter-color .color-item');
    if (allColorList) {
      for (let i = 0; i < allColorList.length; i++) {
        allColorList[i].classList.remove('active');
      }
    }
  }

  // ---------------Xử lý filter cho từng button-------------
  // 1. Button filter laptop
  laptopFilter() {
    // Khởi tạo lại filter
    this.filter = new Filter();
    // Set thẳng brand cho filter
    this.filter.brand.push(this.brand);

    // Screen
    const laptopScreenItemAll = document.querySelectorAll(
      '#laptop-filter-screen .filter-item'
    );
    for (let i = 0; i < laptopScreenItemAll.length; i++) {
      if (laptopScreenItemAll[i].classList.contains('active')) {
        const value = laptopScreenItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.screen.push(value);
        }
      }
    }

    // Price
    const laptopRamItemAll = document.querySelectorAll(
      '#laptop-filter-ram .filter-item'
    );
    for (let i = 0; i < laptopRamItemAll.length; i++) {
      if (laptopRamItemAll[i].classList.contains('active')) {
        const value = laptopRamItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.ram.push(value);
        }
      }
    }

    // Ram
    const laptopPriceItemAll = document.querySelectorAll(
      '#laptop-filter-price .filter-item'
    );
    for (let i = 0; i < laptopPriceItemAll.length; i++) {
      if (laptopPriceItemAll[i].classList.contains('active')) {
        const value = laptopPriceItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.price = value;
        }
      }
    }

    this._service.filterProduct(this.categoryName, this.filter).subscribe({
      next: (data) => (this.products = data),
    });
    console.log(this.filter);

    // Set sort về trạng thái ban đầu
    const selectElement = document.getElementById('sort') as HTMLSelectElement;
    if (selectElement) {
      selectElement.selectedIndex = -1;
    }
  }

  // 2. Button filter Phone or Tablet
  phoneTabletFilter() {
    // Khởi tạo lại filter
    this.filter = new Filter();
    // Set thẳng brand cho filter
    this.filter.brand.push(this.brand);

    // Storage
    const phoneStorageItemAll = document.querySelectorAll(
      '#phone-filter-storage .filter-item'
    );
    for (let i = 0; i < phoneStorageItemAll.length; i++) {
      if (phoneStorageItemAll[i].classList.contains('active')) {
        const value = phoneStorageItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.screen.push(value);
        }
      }
    }

    // Ram
    const phoneRamItemAll = document.querySelectorAll(
      '#phone-filter-ram .filter-item'
    );
    for (let i = 0; i < phoneRamItemAll.length; i++) {
      if (phoneRamItemAll[i].classList.contains('active')) {
        const value = phoneRamItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.ram.push(value);
        }
      }
    }

    // Price
    const phonePriceItemAll = document.querySelectorAll(
      '#phone-filter-price .filter-item'
    );
    for (let i = 0; i < phonePriceItemAll.length; i++) {
      if (phonePriceItemAll[i].classList.contains('active')) {
        const value = phonePriceItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.price = value;
        }
      }
    }

    this._service.filterProduct(this.categoryName, this.filter).subscribe({
      next: (data) => (this.products = data),
    });
    console.log(this.filter);

    // Set sort về trạng thái ban đầu
    const selectElement = document.getElementById('sort') as HTMLSelectElement;
    if (selectElement) {
      selectElement.selectedIndex = -1;
    }
  }

  // 3. Button filter earphone
  earphoneFilter() {
    // Khởi tạo lại filter
    this.filter = new Filter();
    // Set thẳng brand cho filter
    this.filter.brand.push(this.brand);

    // Type
    const earphoneTypeItemAll = document.querySelectorAll(
      '#earphone-filter-type .filter-item'
    );
    for (let i = 0; i < earphoneTypeItemAll.length; i++) {
      if (earphoneTypeItemAll[i].classList.contains('active')) {
        const value = earphoneTypeItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.type.push(value);
        }
      }
    }

    // Price
    const earphonePriceItemAll = document.querySelectorAll(
      '#earphone-filter-price .filter-item'
    );
    for (let i = 0; i < earphonePriceItemAll.length; i++) {
      if (earphonePriceItemAll[i].classList.contains('active')) {
        const value = earphonePriceItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.price = value;
        }
      }
    }

    this._service.filterProduct(this.categoryName, this.filter).subscribe({
      next: (data) => (this.products = data),
    });
    console.log(this.filter);

    // Set sort về trạng thái ban đầu
    const selectElement = document.getElementById('sort') as HTMLSelectElement;
    if (selectElement) {
      selectElement.selectedIndex = -1;
    }
  }

  // 4. Button filter keyboard
  keyboardFilter() {
    // Khởi tạo lại filter
    this.filter = new Filter();
    // Set thẳng brand cho filter
    this.filter.brand.push(this.brand);

    // Type
    const keyboardTypeItemAll = document.querySelectorAll(
      '#keyboard-filter-type .filter-item'
    );
    for (let i = 0; i < keyboardTypeItemAll.length; i++) {
      if (keyboardTypeItemAll[i].classList.contains('active')) {
        const value = keyboardTypeItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.type.push(value);
        }
      }
    }

    // connection
    const keyboardConnectionItemAll = document.querySelectorAll(
      '#keyboard-filter-connection .filter-item'
    );
    for (let i = 0; i < keyboardConnectionItemAll.length; i++) {
      if (keyboardConnectionItemAll[i].classList.contains('active')) {
        const value = keyboardConnectionItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.connection.push(value);
        }
      }
    }

    // Price
    const keyboardPriceItemAll = document.querySelectorAll(
      '#keyboard-filter-price .filter-item'
    );
    for (let i = 0; i < keyboardPriceItemAll.length; i++) {
      if (keyboardPriceItemAll[i].classList.contains('active')) {
        const value = keyboardPriceItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.price = value;
        }
      }
    }

    this._service.filterProduct(this.categoryName, this.filter).subscribe({
      next: (data) => (this.products = data),
    });
    console.log(this.filter);

    // Set sort về trạng thái ban đầu
    const selectElement = document.getElementById('sort') as HTMLSelectElement;
    if (selectElement) {
      selectElement.selectedIndex = -1;
    }
  }

  // 5. Button filter application
  applicationFilter() {
    // Khởi tạo lại filter
    this.filter = new Filter();
    // Set thẳng brand cho filter
    this.filter.brand.push(this.brand);

    // Type
    const applicationTypeItemAll = document.querySelectorAll(
      '#application-filter-type .filter-item'
    );
    for (let i = 0; i < applicationTypeItemAll.length; i++) {
      if (applicationTypeItemAll[i].classList.contains('active')) {
        const value = applicationTypeItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.type.push(value);
        }
      }
    }

    // language
    const applicationLanguageItemAll = document.querySelectorAll(
      '#application-filter-language .filter-item'
    );
    for (let i = 0; i < applicationLanguageItemAll.length; i++) {
      if (applicationLanguageItemAll[i].classList.contains('active')) {
        const value = applicationLanguageItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.language.push(value);
        }
      }
    }

    // Price
    const applicationPriceItemAll = document.querySelectorAll(
      '#application-filter-price .filter-item'
    );
    for (let i = 0; i < applicationPriceItemAll.length; i++) {
      if (applicationPriceItemAll[i].classList.contains('active')) {
        const value = applicationPriceItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.price = value;
        }
      }
    }

    this._service.filterProduct(this.categoryName, this.filter).subscribe({
      next: (data) => (this.products = data),
    });
    console.log(this.filter);

    // Set sort về trạng thái ban đầu
    const selectElement = document.getElementById('sort') as HTMLSelectElement;
    if (selectElement) {
      selectElement.selectedIndex = -1;
    }
  }

  // 6. Button filter mouse
  mouseFilter() {
    // Khởi tạo lại filter
    this.filter = new Filter();
    // Set thẳng brand cho filter
    this.filter.brand.push(this.brand);

    // Price
    const mousePriceItemAll = document.querySelectorAll(
      '#mouse-filter-price .filter-item'
    );
    for (let i = 0; i < mousePriceItemAll.length; i++) {
      if (mousePriceItemAll[i].classList.contains('active')) {
        const value = mousePriceItemAll[i].getAttribute('data-value');
        if (value) {
          this.filter.price = value;
        }
      }
    }

    this._service.filterProduct(this.categoryName, this.filter).subscribe({
      next: (data) => (this.products = data),
    });
    console.log(this.filter);

    // Set sort về trạng thái ban đầu
    const selectElement = document.getElementById('sort') as HTMLSelectElement;
    if (selectElement) {
      selectElement.selectedIndex = -1;
    }
  }

  // --------------- Sort sản phẩm ----------------
  sortProduct() {
    this._service.sortProducts(this.typeSort, this.products).subscribe({
      next: (data) => (this.products = data),
    });
  }
}

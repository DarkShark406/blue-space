import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter } from 'src/app/interfaces/filter';
import { Product } from 'src/app/interfaces/product';
import { CartProductService } from 'src/app/services/cart-product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'app-brand-product',
  templateUrl: './brand-product.component.html',
  styleUrls: ['./brand-product.component.css'],
})
export class BrandProductComponent implements OnInit {
  products: any;
  errorMessage: string = '';
  typeShowList = true; // Kiểu hiển thị danh sách sản phẩm: true = grid, false = horizontal
  typeSort: string = ''; // Kiểu sort: asc: tăng dần, desc: giảm dần
  brand: string = '';

  pageSize = 20;
  currentPage = 1;
  pageNumbers: number[] = [];

  constructor(
    private _service: ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartProductService,
    private searchBarService: SearchBarService
  ) {}
  ngOnInit() {
    this.brand = this.route.snapshot.params['brand'];

    if (this.brand) {
      this._service.getProductForBrand(this.brand).subscribe({
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

  // --------------- Sort sản phẩm ----------------
  sortProduct() {
    this._service.sortProducts(this.typeSort, this.products).subscribe({
      next: (data) => (this.products = data),
      error: (err) =>
        alert(
          'Đang có quá nhiều sản phẩm. Hãy dùng chức năng lọc để lọc trước một ít'
        ),
    });
  }
}

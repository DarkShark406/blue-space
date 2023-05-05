import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  products: any;
  errorMessage: string = '';
  typeShowList = true;

  constructor(
    private _service: ProductCategoryService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    const categoryName = this.route.snapshot.params['category'];
    console.log(categoryName);
    if (categoryName) {
      this._service.getProductForCategory(categoryName).subscribe({
        next: (data) => (this.products = data),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this._service.getAllProduct().subscribe((d) => {
        this.products = d.slice(0, 100);
      });
    }
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

  deleteFilter() {
    const allBrandList = document.querySelectorAll('.brand-item');
    if (allBrandList) {
      for (let i = 0; i < allBrandList.length; i++) {
        allBrandList[i].classList.remove('active');
      }
    }

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
}

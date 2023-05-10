import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ComparisionService } from 'src/app/services/comparision.service';
import { Location } from '@angular/common';
import { CartProductService } from 'src/app/services/cart-product.service';

@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.css'],
})
export class ComparisionComponent {
  id1: any;
  id2: any;
  listProduct: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private comparisionService: ComparisionService,
    private location: Location,
    private cartService: CartProductService,
    private router: Router
  ) {
    this.id1 = this.route.snapshot.queryParamMap.get('id1');
    this.id2 = this.route.snapshot.queryParamMap.get('id2');
  }

  ngOnInit(): void {
    // Lấy giá trị của query params id1 và id2

    this.comparisionService
      .getComparisionProduct(this.id1, this.id2)
      .subscribe((d) => {
        this.listProduct = d;
      });
  }
  goBack() {
    this.location.back();
  }
  buyNow(product: Product) {
    this.addToCart(product, 1);
    this.router.navigate(['make-payment']);
  }
  selectedColor = '';
  addToCart(product: Product, quantity: number) {
    const item = Object.assign({}, product);
    item.specifications = Object.assign({}, product.specifications);
    if (item.specifications.color != undefined) {
      if (this.selectedColor != '') {
        item.specifications.color = [this.selectedColor];
      } else {
        item.specifications.color = [product.specifications.color[0]];
      }
    }
    // Viết serivce truyền item và quantity
    this.cartService.addProductToCart(item, quantity);
  }
}

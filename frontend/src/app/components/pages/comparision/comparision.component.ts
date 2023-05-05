import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ComparisionService } from 'src/app/services/comparision.service';

@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.css'],
})
export class ComparisionComponent {
  id1: any;
  id2: any;
  listProduct: Product[] = [];
  product1 = [
    'https://via.placeholder.com/500x300/FF5733/FFFFFF',
    'https://via.placeholder.com/500x300/C70039/FFFFFF',
    'https://via.placeholder.com/500x300/900C3F/FFFFFF',
    'https://via.placeholder.com/500x300/581845/FFFFFF',
  ];
  constructor(
    private route: ActivatedRoute,
    private comparisionService: ComparisionService
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
}

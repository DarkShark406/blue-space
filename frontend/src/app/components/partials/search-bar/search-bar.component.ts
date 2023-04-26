import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  products = [
    {
      name: 'Product A',
      description: 'This is the description of product A',
      price: 20,
      image: 'https://example.com/product-a.jpg',
    },
    {
      name: 'Product B',
      description: 'This is the description of product B',
      price: 25,
      image: 'https://example.com/product-b.jpg',
    },
    {
      name: 'Product C',
      description: 'This is the description of product C',
      price: 30,
      image: 'https://example.com/product-c.jpg',
    },
  ];
  searchControl = new FormControl();
  searchTerm: string = '';
  suggestions: any;

  onSearch() {
    // Lọc dữ liệu theo từ khóa search và lấy các suggestion
    this.suggestions = this.products.filter((data: any) =>
      data.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    // .map((data: any) => data.name);
  }
}

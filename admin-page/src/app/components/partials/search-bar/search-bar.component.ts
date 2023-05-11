import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchControl = new FormControl();
  searchTerm: string = '';
  @Output() public childEvent = new EventEmitter();
  allProduct: Product[] = [];
  suggestions: Product[] = [];
  constructor(private searchBarService: SearchBarService) {}
  onSearch() {
    // Lọc dữ liệu theo từ khóa search và lấy các suggestion
    this.suggestions = [];
    this.searchBarService.getData(this.searchTerm).subscribe((d) => {
      this.allProduct = d;
      this.suggestions = d.slice(0, 5);
    });
  }

  sendSuggestProduct() {
    console.log(this.allProduct);
    this.childEvent.emit(this.allProduct);
  }
}

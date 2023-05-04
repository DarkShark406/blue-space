import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isSearchActive = false;
  isAuth = false;
  user = { name: 'Lam' };
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }
  logout() {}
}

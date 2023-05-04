import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { HeaderService } from 'src/app/services/header.service';
import { NavItem } from 'src/app/interfaces/nav-item';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isSearchActive = false;
  isAuth = false;
  user = { name: 'Lam' };
  laptop: any;
  phone: any;
  tablet: any;
  earphone: any;
  keyboard: any;
  application: any;
  constructor(private headerService: HeaderService) {}
  ngOnInit() {
    this.headerService.getNavItem().subscribe((d) => {
      this.laptop = d.find((x) => x.category == 'laptop')?.brands;
      this.phone = d.find((x) => x.category == 'phone')?.brands;
      this.tablet = d.find((x) => x.category == 'tablet')?.brands;
      this.earphone = d.find((x) => x.category == 'earphone')?.brands;
      this.keyboard = d.find((x) => x.category == 'keyboard')?.brands;
      this.application = d.find((x) => x.category == 'application')?.brands;
    });
  }
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }
  logout() {}
}

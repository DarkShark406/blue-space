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
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { CartProductService } from 'src/app/services/cart-product.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isSearchActive = false;
  user!: User;
  laptop: any;
  phone: any;
  tablet: any;
  earphone: any;
  keyboard: any;
  application: any;

  numberProductInCart: number = 0;
  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private cartService: CartProductService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    console.log(this.user);
  }
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
  logout() {
    this.cartService.saveCartToUser().subscribe(
      (response) => {
        alert('thành công');
      },
      (error) => {
        alert('thất bại');
      }
    );
    this.userService.logout();
  }
  get isAuth() {
    return this.user.token;
  }
}

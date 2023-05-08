import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Cart, CartItem } from '../interfaces/cart';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class CartProductService {
  constructor(private http: HttpClient) {}

  getCart() {
    console.log('load lấy cart');
    let cartResult = new Cart();

    // Lấy dữ liệu từ cart
    const userLS = localStorage.getItem('User');
    if (userLS != null) {
      let user = JSON.parse(userLS);

      // Kiểm tra xem có cart đang sử dụng hay không
      const cartLS = localStorage.getItem('cart');
      if (cartLS != null) {
        // Nếu có thì gộp các sản phẩm ở cart user và cart lại
        let cart = JSON.parse(cartLS);

        cartResult.items = [...user.cart.items];

        cart.items.forEach((item: CartItem) => {
          const existingItemIndex = cartResult.items.findIndex(
            (cartResultItem) => cartResultItem.product.id == item.product.id
          );

          // Nếu tìm thấy phần tử có id trùng
          if (existingItemIndex !== -1) {
            // So sánh và cập nhật quantity nếu quantity mới lớn hơn
            if (item.quantity > cartResult.items[existingItemIndex].quantity) {
              cartResult.items[existingItemIndex].quantity = item.quantity;
            }
          } else {
            cartResult.items.push(item);
          }
        });
        // Loại bỏ luôn cart trước khi mà đăng nhập
        // Khi đăng nhập rồi thì chỉ sử dụng cart của user
        localStorage.removeItem('cart');
      } else {
        // Không có cart đang sử dụng thì cart = luôn cart của user
        cartResult = user.cart;
      }
    } else {
      // Không thì lấy cart của LS
      const cartLS = localStorage.getItem('cart');
      if (cartLS != null) {
        const cart = JSON.parse(cartLS);
        cartResult = cart;
      }
    }

    return cartResult;
  }

  getNumberProduct() {
    return this.getCart().items.length;
  }

  addProductToCart(item: Product, quantity: number) {
    console.log('id của sp: ' + item.id);
    // Lấy ra user trên local storage
    const userLS = localStorage.getItem('User');
    if (userLS != null) {
      // Nếu có thì lưu sp vào cart của user
      const user = JSON.parse(userLS);

      console.log(user.cart.items);

      const existingIndexItem = user.cart.items.findIndex((cartItem: any) => {
        return cartItem.product.id == item.id;
      });

      if (existingIndexItem != -1) {
        console.log('trùng nên push vào');
        user.cart.items[existingIndexItem].quantity += quantity;
      } else {
        console.log('sản phẩm mới');
        user.cart.items.push(new CartItem(item));
        user.cart.items[user.cart.items.length - 1].quantity = quantity;
      }
      console.log(user);
      // Lưu user vào lại local storage
      localStorage.setItem('User', JSON.stringify(user));
    }
    // Nếu không thì lưu vào cart trên local storage
    else {
      if (localStorage.getItem('cart') == null) {
        localStorage.setItem('cart', JSON.stringify(new Cart()));
      }
      const cartLS = localStorage.getItem('cart');
      if (cartLS != null) {
        const cart = JSON.parse(cartLS);

        // Kiểm tra xem sản phẩm này đã tồn tại trong cart chưa
        const existingIndexItem = cart.items.findIndex((cartItem: any) => {
          return cartItem.product.id == item.id;
        });

        if (existingIndexItem != -1) {
          // Nếu có thì tăng số lượng lên theo số lượng user chọn
          cart.items[existingIndexItem].quantity += quantity;
        } else {
          // Chưa thì pushs sp mới vào
          cart.items.push(new CartItem(item));
          cart.items[cart.items.length - 1].quantity = quantity;
        }
        // Lưu cart về lại cart của local storage
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }

  saveCartToLocalStorage(cartOnline: Cart) {
    const userLS = localStorage.getItem('User');
    if (userLS != null) {
      let user = JSON.parse(userLS);
      user.cart = cartOnline;
      localStorage.setItem('User', JSON.stringify(user));
    } else {
      const cartLS = localStorage.getItem('cart');
      if (cartLS != null) {
        let cart = JSON.parse(cartLS);
        cart = cartOnline;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  // Lưu cart trên local storage về lại db user
  saveCartToUser(): Observable<any> {
    const url = 'http://localhost:5000/auth/save-cart';
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = { headers: headers, responseType: 'text' };

    let user = new User();
    const userLS = localStorage.getItem('User');
    if (userLS != null) {
      user = JSON.parse(userLS);
    }

    return this.http.post<any>(url, JSON.stringify(user), requestOptions).pipe(
      map((res) => JSON.parse(res) as User),
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteCartItem(cart: Cart, item: CartItem) {
    return cart.items.filter((cartItem) => {
      return cartItem.product.id != item.product.id;
    });
  }
  clearCart() {
    const user = JSON.parse(localStorage.getItem('user') || '');

    const newCart = new Cart();

    user.cart = newCart;

    localStorage.setItem('user', JSON.stringify(user));
  }
}

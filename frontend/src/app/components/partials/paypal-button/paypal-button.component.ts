import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { CartProductService } from 'src/app/services/cart-product.service';
import { OrderService } from 'src/app/services/order.service';

declare var paypal: any;
@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css'],
})
export class PaypalButtonComponent {
  @Input()
  order!: Order;

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe({
            next: (OrderId) => {
              this.router.navigate(['/orders/' + OrderId]);
              setTimeout(() => {
                window.location.reload();
              }, 1);
            },
            error: (error) => {
              window.alert('Payment Save Failed');
            },
          });
        },
        onError: (err: any) => {
          window.alert('Payment Failed');
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}

import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  userSubscription: Subscription;
  userId: string;
  shipping = {};
  constructor(private router: Router ,private authService: AuthService ,private orderService: OrderService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.storeOrder(order)
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

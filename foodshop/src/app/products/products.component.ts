import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy {
  filtedredProducts;
  products$: Product[] = [];
  category: string;
  cart: any
  subscription: Subscription
  constructor(route: ActivatedRoute ,productServie: ProductService,private shoppingCart: ShoppingCartService) {

    productServie.getAll().pipe(switchMap(product => {
      this.products$ = product;
      return route.queryParamMap
    }))
    .subscribe(params => {
    this.category = params.get('category');
    this.filtedredProducts = (this.category) ?
    this.products$.filter(p => p.category === this.category) :
    this.products$
    })

  }
  async ngOnInit() {
    this.subscription = (await this.shoppingCart.getCart()).subscribe(cart => this.cart = cart);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

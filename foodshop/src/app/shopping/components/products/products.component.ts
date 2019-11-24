import { ShoppingCart } from 'shared/models/shopping-cart';
import { async } from '@angular/core/testing';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filtedredProducts;
  products$: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  constructor(private route: ActivatedRoute ,private productServie: ProductService,private shoppingCart: ShoppingCartService) {



  }
  async ngOnInit() {
    this.cart$ = await this.shoppingCart.getCart();

    this.populateProducts();
  }

  private populateProducts() {
    this.productServie.getAll().pipe(switchMap(product => {
      this.products$ = product;
      return this.route.queryParamMap
    }))
    .subscribe(params => {
    this.category = params.get('category');
    this.applyFilter();
    })
  }

  private applyFilter() {
    this.filtedredProducts = (this.category) ?
    this.products$.filter(p => p.category === this.category) :
    this.products$
  }
}

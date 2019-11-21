import { ShoppingCart } from './models/shopping-cart';
import { async } from '@angular/core/testing';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').query.ref.push({
      dateCreated: new Date().getTime()
    })
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).valueChanges().pipe(map(x => new ShoppingCart(x['items'])));
  }

  private getItem(cartId, productId: string) {
    return this.db.object('/shopping-cart/' + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem( cartId , product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
      if (item) {
        item$.query.ref.update({
          //product: product,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: (item.quantity || 0 ) + change });
      }
      else if ( change == 1 ) item$.set({
        //product: product,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1 });
    })
  }

}

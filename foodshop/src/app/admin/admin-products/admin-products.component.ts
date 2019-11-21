import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy{

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  products: Product[];
  filteredProducts$: Product[];
  subscription: Subscription;

  constructor(private productsService: ProductService) {
    this.subscription = this.productsService.getAll().subscribe(product => {
      this.filteredProducts$ = this.products = product;
      this.dtTrigger.next();
    });
  }

  filter(query: string) {
    this.filteredProducts$ = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}

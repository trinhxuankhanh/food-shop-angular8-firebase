import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;
  constructor(private route: ActivatedRoute ,private router: Router, private category: CategoryService, private productService: ProductService) {
    this.categories$ = category.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }


  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if(!confirm('Are you sure you want to delete this product ?')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }
}

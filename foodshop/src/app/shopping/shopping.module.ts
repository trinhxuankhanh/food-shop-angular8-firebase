import { AuthGuardService } from 'shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { SharedModule } from 'shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';



@NgModule({
  declarations: [
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    MyOrdersComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ProductFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
      { path: 'my/orders' , component:MyOrdersComponent, canActivate: [AuthGuardService] }
    ])
  ]
})
export class ShoppingModule { }

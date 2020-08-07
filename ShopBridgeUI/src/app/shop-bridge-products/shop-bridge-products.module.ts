import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopBridgeProductsRoutingModule } from './shop-bridge-products-routing.module';
import { ShopBridgeItemsComponent } from './shop-bridge-items/shop-bridge-items.component';
import { ShopBridgeItemFormPopupComponent } from './shop-bridge-items/shop-bridge-item-form-popup/shop-bridge-item-form-popup.component';
import { ShopBridgeItemViewComponent } from './shop-bridge-item-view/shop-bridge-item-view.component';


@NgModule({
  declarations: [ShopBridgeItemsComponent, ShopBridgeItemFormPopupComponent, ShopBridgeItemViewComponent],
  imports: [
    CommonModule,
    ShopBridgeProductsRoutingModule
  ]
})
export class ShopBridgeProductsModule { }

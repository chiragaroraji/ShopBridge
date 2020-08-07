import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-bridge-items',
  templateUrl: './shop-bridge-items.component.html',
  styleUrls: ['./shop-bridge-items.component.css']
})
export class ShopBridgeItemsComponent implements OnInit {
  openItemPopup:boolean=false;
  ItemId:number;
  constructor() { }

  ngOnInit(): void {
  }
  closeItemPopup(val){
    console.log(val);
  }
}

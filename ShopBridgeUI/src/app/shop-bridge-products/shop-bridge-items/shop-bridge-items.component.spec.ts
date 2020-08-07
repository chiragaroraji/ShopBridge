import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBridgeItemsComponent } from './shop-bridge-items.component';

describe('ShopBridgeItemsComponent', () => {
  let component: ShopBridgeItemsComponent;
  let fixture: ComponentFixture<ShopBridgeItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopBridgeItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBridgeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

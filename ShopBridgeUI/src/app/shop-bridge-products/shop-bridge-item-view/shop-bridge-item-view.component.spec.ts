import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBridgeItemViewComponent } from './shop-bridge-item-view.component';

describe('ShopBridgeItemViewComponent', () => {
  let component: ShopBridgeItemViewComponent;
  let fixture: ComponentFixture<ShopBridgeItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopBridgeItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBridgeItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

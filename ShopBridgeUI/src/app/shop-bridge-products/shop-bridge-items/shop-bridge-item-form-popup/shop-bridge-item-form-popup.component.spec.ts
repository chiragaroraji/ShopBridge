import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBridgeItemFormPopupComponent } from './shop-bridge-item-form-popup.component';

describe('ShopBridgeItemFormPopupComponent', () => {
  let component: ShopBridgeItemFormPopupComponent;
  let fixture: ComponentFixture<ShopBridgeItemFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopBridgeItemFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBridgeItemFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponboxComponent } from './couponbox.component';

describe('CouponboxComponent', () => {
  let component: CouponboxComponent;
  let fixture: ComponentFixture<CouponboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

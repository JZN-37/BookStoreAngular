import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureboxComponent } from './featurebox.component';

describe('FeatureboxComponent', () => {
  let component: FeatureboxComponent;
  let fixture: ComponentFixture<FeatureboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

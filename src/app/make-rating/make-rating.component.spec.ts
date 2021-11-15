import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRatingComponent } from './make-rating.component';

describe('MakeRatingComponent', () => {
  let component: MakeRatingComponent;
  let fixture: ComponentFixture<MakeRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

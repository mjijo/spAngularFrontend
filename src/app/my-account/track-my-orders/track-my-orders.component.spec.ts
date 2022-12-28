import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMyOrdersComponent } from './track-my-orders.component';

describe('TrackMyOrdersComponent', () => {
  let component: TrackMyOrdersComponent;
  let fixture: ComponentFixture<TrackMyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackMyOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackMyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

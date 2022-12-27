import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgBidsComponent } from './org-bids.component';

describe('OrgBidsComponent', () => {
  let component: OrgBidsComponent;
  let fixture: ComponentFixture<OrgBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgBidsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgProductsComponent } from './org-products.component';

describe('OrgProductsComponent', () => {
  let component: OrgProductsComponent;
  let fixture: ComponentFixture<OrgProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedServiceProvidersComponent } from './featured-service-providers.component';

describe('FeaturedServiceProvidersComponent', () => {
  let component: FeaturedServiceProvidersComponent;
  let fixture: ComponentFixture<FeaturedServiceProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedServiceProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedServiceProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

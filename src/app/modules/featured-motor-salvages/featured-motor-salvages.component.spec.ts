import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMotorSalvagesComponent } from './featured-motor-salvages.component';

describe('FeaturedMotorSalvagesComponent', () => {
  let component: FeaturedMotorSalvagesComponent;
  let fixture: ComponentFixture<FeaturedMotorSalvagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedMotorSalvagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedMotorSalvagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

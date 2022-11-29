import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRegistrationComponent } from './individual-registration.component';

describe('IndividualRegistrationComponent', () => {
  let component: IndividualRegistrationComponent;
  let fixture: ComponentFixture<IndividualRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

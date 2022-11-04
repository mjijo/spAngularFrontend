import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferedClientsComponent } from './reffered-clients.component';

describe('RefferedClientsComponent', () => {
  let component: RefferedClientsComponent;
  let fixture: ComponentFixture<RefferedClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferedClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefferedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

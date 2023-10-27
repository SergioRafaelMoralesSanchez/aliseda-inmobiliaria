import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleCardComponent } from './inmueble-card.component';

describe('InmuebleCardComponent', () => {
  let component: InmuebleCardComponent;
  let fixture: ComponentFixture<InmuebleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InmuebleCardComponent]
    });
    fixture = TestBed.createComponent(InmuebleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

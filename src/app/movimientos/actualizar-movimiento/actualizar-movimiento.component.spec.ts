import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMovimientoComponent } from './actualizar-movimiento.component';

describe('ActualizarMovimientoComponent', () => {
  let component: ActualizarMovimientoComponent;
  let fixture: ComponentFixture<ActualizarMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarMovimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

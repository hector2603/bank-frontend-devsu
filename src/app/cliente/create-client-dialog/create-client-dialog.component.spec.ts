import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientDialogComponentComponent } from './create-client-dialog.component';

describe('CreateClientDialogComponentComponent', () => {
  let component: CreateClientDialogComponentComponent;
  let fixture: ComponentFixture<CreateClientDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClientDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

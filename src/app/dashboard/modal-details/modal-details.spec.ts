import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetails } from './modal-details';

describe('ModalDetails', () => {
  let component: ModalDetails;
  let fixture: ComponentFixture<ModalDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

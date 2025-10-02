import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebard } from './sidebar';

describe('Sidebard', () => {
  let component: Sidebard;
  let fixture: ComponentFixture<Sidebard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidebard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

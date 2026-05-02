import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentGaps } from './employment-gaps';

describe('EmploymentGaps', () => {
  let component: EmploymentGaps;
  let fixture: ComponentFixture<EmploymentGaps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentGaps],
    }).compileComponents();

    fixture = TestBed.createComponent(EmploymentGaps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

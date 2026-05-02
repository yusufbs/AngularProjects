import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCompetencies } from './core-competencies';

describe('CoreCompetencies', () => {
  let component: CoreCompetencies;
  let fixture: ComponentFixture<CoreCompetencies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreCompetencies],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreCompetencies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

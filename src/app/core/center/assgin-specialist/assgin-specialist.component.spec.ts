import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssginSpecialistComponent } from './assgin-specialist.component';

describe('AssginSpecialistComponent', () => {
  let component: AssginSpecialistComponent;
  let fixture: ComponentFixture<AssginSpecialistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssginSpecialistComponent]
    });
    fixture = TestBed.createComponent(AssginSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

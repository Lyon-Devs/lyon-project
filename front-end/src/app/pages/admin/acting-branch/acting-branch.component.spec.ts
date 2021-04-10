import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActingBranchComponent } from './acting-branch.component';

describe('ActingBranchComponent', () => {
  let component: ActingBranchComponent;
  let fixture: ComponentFixture<ActingBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActingBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

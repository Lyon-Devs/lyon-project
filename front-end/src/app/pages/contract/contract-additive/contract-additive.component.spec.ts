import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAdditiveComponent } from './contract-additive.component';

describe('ContractAdditiveComponent', () => {
  let component: ContractAdditiveComponent;
  let fixture: ComponentFixture<ContractAdditiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAdditiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAdditiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

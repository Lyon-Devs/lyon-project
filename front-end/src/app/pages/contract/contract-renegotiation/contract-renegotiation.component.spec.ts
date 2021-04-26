import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRenegotiationComponent } from './contract-renegotiation.component';

describe('ContractRenegotiationComponent', () => {
  let component: ContractRenegotiationComponent;
  let fixture: ComponentFixture<ContractRenegotiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractRenegotiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRenegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

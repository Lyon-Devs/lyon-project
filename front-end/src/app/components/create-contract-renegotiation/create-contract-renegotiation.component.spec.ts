import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractRenegotiationComponent } from './create-contract-renegotiation.component';

describe('CreateContractRenegotiationComponent', () => {
  let component: CreateContractRenegotiationComponent;
  let fixture: ComponentFixture<CreateContractRenegotiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractRenegotiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractRenegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

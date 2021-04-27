import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractAdditiveComponent } from './create-contract-additive.component';

describe('CreateContractAdditiveComponent', () => {
  let component: CreateContractAdditiveComponent;
  let fixture: ComponentFixture<CreateContractAdditiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractAdditiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractAdditiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

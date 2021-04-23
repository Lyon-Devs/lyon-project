import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProposalRevisionComponent } from './create-proposal-revision.component';

describe('CreateProposalRevisionComponent', () => {
  let component: CreateProposalRevisionComponent;
  let fixture: ComponentFixture<CreateProposalRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProposalRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProposalRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

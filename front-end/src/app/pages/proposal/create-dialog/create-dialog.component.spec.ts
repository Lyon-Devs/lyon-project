import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CreateDialogComponent } from './create-dialog.component';
import { ProposalService } from '../../../services/proposal/proposal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


describe('CreateDialogComponent', () => {
  let component: CreateDialogComponent;
  let fixture: ComponentFixture<CreateDialogComponent>;
  let valueServiceSpy: jasmine.SpyObj<FormBuilder>;

  // public fb: FormBuilder,
  //   public dialogRef: MatDialogRef<CreateDialogComponent>,
  //   private proposalService: ProposalService,
  //   private snackBar: MatSnackBar,
  //   @Inject(MAT_DIALOG_DATA) public data: any
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDialogComponent],
      providers: [
        { provide: HttpClient, useValue: HttpClient },
        { provide: FormBuilder, useValue: valueServiceSpy },
        { provide: ProposalService, useValue: ProposalService },
        { provide: MatSnackBar, useValue: MatSnackBar },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

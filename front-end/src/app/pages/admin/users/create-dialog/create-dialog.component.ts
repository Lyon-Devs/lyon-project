import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  public hide = true;
  public passMsg: string;
  public formUser = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(8)]],
    role: ['', Validators.required],
    confirmPassword: ['', [Validators.required, Validators.min(8)]]
  }, {
    validator: this.mustMatch('password', 'confirmPassword')
  });
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {
    console.log(this.formUser.value);
    const newUser = this.formUser.value;
    newUser.password_confirmation = newUser.confirmPassword;
    delete newUser.confirmPassword;
    this.authService.registerUser(newUser).subscribe(user => {
      this.dialogRef.close();
      this.snackBar.open('Usuário criado com sucesso');
    });
  }

  public mustMatch(controlName: string, matchingControlName: string): AbstractControl | any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}

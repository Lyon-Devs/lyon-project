import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../models/users.model';
import { ErrorService } from '../../../../services/error/error.service';
@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  public hide = true;
  public passMsg: string;
  public formUser: FormGroup;
  public createForm: boolean;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private errorService: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {

    this.createForm = this.data?.id ? false : true;
    const required = this.createForm ? [Validators.required, Validators.min(8)] : [Validators.min(8)];
    this.formUser = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      password: ['', required],
      confirmPassword: ['', required],
      role: [this.data?.roles?.map(role => role.slug) || '', Validators.required],
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });

    // console.log('this.data', this.data);

  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {
    const newUser = this.formUser.value;
    newUser.password_confirmation = newUser.confirmPassword;
    delete newUser.confirmPassword;

    if (this.createForm) {
      this.authService.registerUser(newUser).subscribe(user => {
        this.dialogRef.close('created');
        this.snackBar.open('Usu??rio criado com sucesso');
      }, error => {
        this.errorService.traitError(error.error?.error?.message || error.error?.errors || 'Error no servidor tente novamente');
      });
    } else {

      newUser.id = this.data.id;
      // clean properties
      Object.keys(newUser).forEach((k) => {
        if (newUser[k] == null || newUser[k] === '') {
          delete newUser[k];
          return;
        }
        if (Array.isArray(newUser[k])) {
          if (newUser[k].length === 0) {
            delete newUser[k];
          }
        }
      });
      this.authService.updateUser(newUser).subscribe(user => {
        this.dialogRef.close('updated');
        this.snackBar.open('Usu??rio atualizado com sucesso');
      }, error => {
        this.errorService.traitError(error.error?.error?.message || error.error?.errors || 'Error no servidor tente novamente');
      });
    }

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

  private getFirstRoleUser(user: User): string {
    return user?.roles[0].slug;
  }

}

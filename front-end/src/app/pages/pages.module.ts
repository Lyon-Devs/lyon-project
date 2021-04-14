import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UsersComponent } from './admin/users/users.component';
import { ProposalComponent } from './proposal/proposal.component';


@NgModule({
  declarations: [LoginModule, HomeModule, UsersComponent, ProposalComponent],
  imports: [
    CommonModule,
    LoginModule,
    HomeModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: []
})
export class PagesModule { }

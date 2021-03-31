import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [LoginModule, HomeModule],
  imports: [
    CommonModule,
    LoginModule,
    HomeModule
  ]
})
export class PagesModule { }

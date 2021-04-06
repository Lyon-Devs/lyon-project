import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersModule } from './users/users.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UsersModule,
  ],
  exports: [
    UsersModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersModule } from './users/users.module';
import { TypeServiceModule } from './type-service/type-service.module';
import { ComponentsModule } from '@components/components.module';





@NgModule({
  declarations: [],
  imports: [
    UsersModule,
    CommonModule,
    TypeServiceModule,
    AdminRoutingModule
  ],
  exports: [
    UsersModule,
  ]
})
export class AdminModule { }

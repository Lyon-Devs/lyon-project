import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersModule } from './users/users.module';
import { TypeServiceModule } from './type-service/type-service.module';
import { ActingBranchModule } from './acting-branch/acting-branch.module';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [],
  imports: [
    UsersModule,
    ClientModule,
    CommonModule,
    TypeServiceModule,
    AdminRoutingModule,
    ActingBranchModule,
  ],
  exports: [
    UsersModule,
  ]
})
export class AdminModule { }

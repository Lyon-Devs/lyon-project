import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService as AuthGuard } from '@services/guard/auth.service';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: ContractComponent, canActivate: [AuthGuard], data: { role: 'comercial' } },
  { path: ':id', component: DetailComponent, canActivate: [AuthGuard], data: { role: 'comercial' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProposalComponent } from './proposal.component';
import { DetailComponent } from './detail/detail.component';
import { ProposalResolve } from '@resolvers/proposal/proposal.resolve';
import { AuthService as AuthGuard } from '@services/guard/auth.service';


const routes: Routes = [
  { path: '', component: ProposalComponent , canActivate: [AuthGuard], data: { role: 'comercial' }},
  { path: ':id', component: DetailComponent ,  resolve: {ProposalResolve}, canActivate: [AuthGuard], data: { role: 'comercial' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRoutingModule { }

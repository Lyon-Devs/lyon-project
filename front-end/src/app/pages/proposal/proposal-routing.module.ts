import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProposalComponent } from './proposal.component';
import { DetailComponent } from './detail/detail.component';
import { ProposalResolve } from '@resolvers/proposal/proposal.resolve';


const routes: Routes = [
  { path: '', component: ProposalComponent },
  { path: ':id', component: DetailComponent ,  resolve: {ProposalResolve}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService as AuthGuard } from '@services/guard/auth.service';
import { Page404Component } from './error/page-404/page-404.component';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', pathMatch: 'full', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'contrato', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule) },
  { path: 'proposta', loadChildren: () => import('./proposal/proposal.module').then(m => m.ProposalModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./error/page-error.module').then(m => m.PageErrorModule) },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

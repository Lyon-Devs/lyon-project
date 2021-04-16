import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthService as AuthGuard } from '@services/guard/auth.service';
import { TypeServiceComponent } from './type-service/type-service.component';
import { ActingBranchComponent } from './acting-branch/acting-branch.component';
import { ClientComponent } from './client/client.component';
import { BuyerComponent } from './buyer/buyer.component';

const routes: Routes = [
  { path: 'user', component: UsersComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'tipo/servicos', component: TypeServiceComponent, canActivate: [AuthGuard], data: { role: 'comercial' } },
  { path: 'ramo/atuacao', component: ActingBranchComponent, canActivate: [AuthGuard], data: { role: 'comercial' } },
  { path: 'clientes', component: ClientComponent, canActivate: [AuthGuard], data: { role: 'comercial' } },
  { path: 'compradores', component: BuyerComponent, canActivate: [AuthGuard], data: { role: 'comercial' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }

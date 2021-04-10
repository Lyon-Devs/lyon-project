import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthService as AuthGuard } from '@services/guard/auth.service';
import { TypeServiceComponent } from './type-service/type-service.component';
import { ActingBranchComponent } from './acting-branch/acting-branch.component';

const routes: Routes = [
  { path: 'user', component: UsersComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'tipo/servicos', component: TypeServiceComponent, canActivate: [AuthGuard], data: { role: 'comercial' } },
  { path: 'ramo/atuacao', component: ActingBranchComponent, canActivate: [AuthGuard], data: { role: 'comercial' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }

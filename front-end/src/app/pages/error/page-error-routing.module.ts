import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Page401Component } from './page-401/page-401.component';
import { Page404Component } from './page-404/page-404.component';

const routes: Routes = [
  { path: '401', component: Page401Component },
  { path: '404', component: Page404Component },

];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PageErrorRouting { }

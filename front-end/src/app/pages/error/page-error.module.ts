import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page401Component } from './page-401/page-401.component';
import { Page404Component } from './page-404/page-404.component';
import { PageErrorRouting } from './page-error-routing.module';

@NgModule({
  declarations: [Page401Component, Page404Component],
  imports: [
    CommonModule,
    PageErrorRouting
  ]
})
export class PageErrorModule { }

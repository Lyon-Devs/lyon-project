import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalComponent } from './external.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ExternalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    ExternalComponent
  ]
})
export class ExternalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './layout/main/main.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ExternalModule } from './layout/external/external.module';
import { MainModule } from './layout/main/main.module';

@NgModule({
  declarations: [],
  imports: [
    MainModule,
    ExternalModule
  ],
  exports: [
    MainModule,
    ExternalModule
  ]
})
export class ComponentsModule { }

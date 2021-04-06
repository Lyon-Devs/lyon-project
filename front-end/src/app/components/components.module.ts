import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ExternalModule } from './layout/external/external.module';
import { MainModule } from './layout/main/main.module';
import { CommonTitleComponent } from './common-title/common-title.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CommonTitleComponent],
  imports: [
    CommonModule,
    MainModule,
    ExternalModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    MainModule,
    ExternalModule,
    CommonTitleComponent
  ]
})
export class ComponentsModule { }

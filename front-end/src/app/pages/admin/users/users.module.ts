import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from '@components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [UsersComponent, CreateDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ComponentsModule,
    MatPaginatorModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }

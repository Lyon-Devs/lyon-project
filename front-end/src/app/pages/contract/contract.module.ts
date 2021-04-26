import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { ContractRoutingModule } from './contract-routing.module';
import { ComponentsModule } from '@components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DetailComponent } from './detail/detail.component';
import { MatListModule } from '@angular/material/list';
import { ContractRenegotiationComponent } from './contract-renegotiation/contract-renegotiation.component';
import { ContractAdditiveComponent } from './contract-additive/contract-additive.component';


@NgModule({
  declarations: [ContractComponent, DetailComponent, ContractRenegotiationComponent, ContractAdditiveComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    ComponentsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatListModule
  ]
})
export class ContractModule { }

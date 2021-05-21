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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DetailComponent } from './detail/detail.component';
import { MatListModule } from '@angular/material/list';
import { ContractRenegotiationComponent } from './contract-renegotiation/contract-renegotiation.component';
import { ContractAdditiveComponent } from './contract-additive/contract-additive.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PointReplacerPipe } from 'src/app/pipes/point-replacer.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';


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
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatListModule,
    MatSlideToggleModule,
    PipesModule
  ],
  providers : []
})
export class ContractModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalComponent } from './proposal.component';
import { ProposalRoutingModule } from './proposal-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from '@components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { DateAdapter, MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS,  MomentDateModule } from '@angular/material-moment-adapter';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMaskModule } from 'ngx-mask';
import { DetailComponent } from './detail/detail.component';
import { PointReplacerPipe } from '../../pipes/point-replacer.pipe';


export const MY_MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [ProposalComponent, CreateDialogComponent, DetailComponent, PointReplacerPipe],
  imports: [
    CommonModule,
    ComponentsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ProposalRoutingModule,
    MatStepperModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatMenuModule,
    MaterialFileInputModule,
    NgxMaskModule,
    MatListModule
  ],
  providers: [
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_MOMENT_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    PointReplacerPipe
  ],
  exports: [
  ]
})
export class ProposalModule { }

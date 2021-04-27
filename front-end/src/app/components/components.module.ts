import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ExternalModule } from './layout/external/external.module';
import { MainModule } from './layout/main/main.module';
import { CommonTitleComponent } from './common-title/common-title.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { CreateProposalRevisionComponent } from './create-proposal-revision/create-proposal-revision.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateContractComponent } from './create-contract/create-contract.component';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateModule } from '@angular/material-moment-adapter';
import { CreateContractAdditiveComponent } from './create-contract-additive/create-contract-additive.component';
import { CreateContractRenegotiationComponent } from './create-contract-renegotiation/create-contract-renegotiation.component';
// import { MY_MOMENT_DATE_FORMATS } from '@pages/proposal/proposal.module';


@NgModule({
  declarations: [CommonTitleComponent, ConfirmComponent, CreateProposalRevisionComponent, CreateContractComponent, CreateContractAdditiveComponent, CreateContractRenegotiationComponent],
  imports: [
    CommonModule,
    MainModule,
    ExternalModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatAutocompleteModule
  ],
  exports: [
    MainModule,
    ExternalModule,
    CommonTitleComponent,
    CreateProposalRevisionComponent,
  ],
  providers: [
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],

})
export class ComponentsModule { }

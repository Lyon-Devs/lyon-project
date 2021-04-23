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
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [CommonTitleComponent, ConfirmComponent, CreateProposalRevisionComponent],
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
    ReactiveFormsModule
  ],
  exports: [
    MainModule,
    ExternalModule,
    CommonTitleComponent,
    CreateProposalRevisionComponent,
    
  ]
})
export class ComponentsModule { }

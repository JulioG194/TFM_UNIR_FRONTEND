import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    SpinnerModule , 
    AlertModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    ModalModule,
    PopoverModule,
    ProgressModule,
    SharedModule,
    ToastModule,
    TooltipModule,
    UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component'
import  { MessagesComponent } from './/messages/messages.component';


@NgModule({
    declarations: [
        SpinnerComponent,
        MessagesComponent,
    ],
    imports: [
     AlertModule,
      GridModule,
      CardModule,
      BadgeModule,
      ButtonModule,
      FormModule,
      ModalModule,
      ToastModule,
      SharedModule,
      UtilitiesModule,
      TooltipModule,
      PopoverModule,
      ProgressModule,
      SpinnerModule,
      CommonModule,
      CardModule,
      ButtonModule,
      GridModule,
      IconModule,
      FormModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
        SpinnerComponent,
        MessagesComponent,
      ]
  })
  export class OthersModule {
  }
  
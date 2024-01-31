import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { RecluiterRoutingModule } from './recluiter-routing.module';
import { RecluiterDashboardComponent } from './recluiter-dashboard/recluiter-dashboard.component';
import { RecluiterProfileComponent } from './recluiter-profile/recluiter-profile.component';
import { RecluiterFormComponent } from './recluiter-form/recluiter-form.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OthersModule } from '../../others/others.module'

@NgModule({
  imports: [
    RecluiterRoutingModule,
    CardModule,
    OthersModule,
    NavModule,
    IconModule,
    TabsModule,
    FormsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    NgbModule
  ],
  declarations: [ 
    RecluiterDashboardComponent,
    RecluiterProfileComponent,
    RecluiterFormComponent
]
})
export class RecluiterModule {
}

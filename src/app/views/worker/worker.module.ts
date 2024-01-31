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
import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerDashboardComponent } from './worker-dashboard/worker-dashboard.component';
import { WorkerFormComponent } from './worker-form/worker-form.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OthersModule } from '../../others/others.module'

@NgModule({
  imports: [
    WorkerRoutingModule,
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
    NgbModule,
  ],
  declarations: [ 
    WorkerDashboardComponent,
    WorkerFormComponent 
]
})
export class WorkerModule {
}

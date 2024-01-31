import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule,
  AvatarModule,
  ButtonGroupModule,
  FormModule,
  NavModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsWorkerComponent } from './widgets-worker/widgets-worker.component';


@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsWorkerComponent,
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    DocsComponentsModule,
    ProgressModule,
    ChartjsModule,
    NavModule,
    TabsModule,
    FormModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    IconModule,
  ],
  exports: [
    WidgetsWorkerComponent,
  ]
})
export class WidgetsModule {
}

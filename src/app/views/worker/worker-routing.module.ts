import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkerDashboardComponent  } from './worker-dashboard/worker-dashboard.component';
import { WorkerFormComponent  } from './worker-form/worker-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: $localize`Trabajadores`
    },
    children: [
        {
            path: 'profile',
            component: WorkerDashboardComponent,
            data: {
              title: 'Perfil'
            }
          },
          {
            path: 'form',
            component: WorkerFormComponent,
            data: {
              title: 'Formulario'
            }
          },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule {
}

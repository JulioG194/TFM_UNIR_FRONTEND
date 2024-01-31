import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecluiterDashboardComponent  } from './recluiter-dashboard/recluiter-dashboard.component';
import { RecluiterProfileComponent  } from './recluiter-profile/recluiter-profile.component';
import { RecluiterFormComponent  } from './recluiter-form/recluiter-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: $localize`Reclutadores`
    },
    children: [
        {
          path: 'workers',
          component: RecluiterDashboardComponent,
          data: {
              title: 'Trabajadores'
          }
       },
        {
            path: 'profile',
            component: RecluiterProfileComponent,
            data: {
                title: 'Perfil'
            }
        },
        {
          path: 'form',
          component: RecluiterFormComponent,
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
export class RecluiterRoutingModule {
}

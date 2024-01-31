import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Reclutador',
    url: '/recluiter',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Trabajadores',
        url: '/recluiter/workers'
      },
      {
        name: 'Perfil',
        url: '/recluiter/profile'
      },
      {
        name: 'Formulario',
        url: '/recluiter/form'
      },
    ]
  },
  {
    name: 'Trabajador',
    url: '/worker',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Perfil',
        url: '/worker/profile'
      },
      {
        name: 'Formulario',
        url: '/worker/form'
      },
    ]
  },
];

export const navItemsWorker: INavData[] = [
  {
    name: 'Trabajador',
    url: '/worker',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Perfil',
        url: '/worker/profile'
      },
      {
        name: 'Formulario',
        url: '/worker/form'
      },
    ]
  },
];

export const navItemsRecluiter: INavData[] = [
  {
    name: 'Reclutador',
    url: '/recluiter',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Trabajadores',
        url: '/recluiter/workers'
      },
      {
        name: 'Perfil',
        url: '/recluiter/profile'
      },
      {
        name: 'Formulario',
        url: '/recluiter/form'
      },
    ],
  },
];

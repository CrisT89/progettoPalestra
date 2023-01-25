import { INavData } from '@coreui/angular';

/**
 * Voci della sidebar
 */
export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-home'
  },
  {
    name: 'Anagrafica',
    url: 'anagrafica',
    icon: 'fa fa-user',
    children: [
      {
        name: 'Dipendenti',
        url: '/employees',
        icon: '#'
      },
      {
        name: 'Mansioni',
        url: '/tasks',
        icon: '#'
      },
      {
        name: 'Incarichi',
        url: '/assignments',
        icon: '#'
      },
    ]
  },
  {
    name: 'Test',
    url: 'test',
    icon: 'fa fa-pie-chart',
  },
  {
    name: 'Categories',
    url: 'categories',
    icon: 'fa fa-tags',
  },

];

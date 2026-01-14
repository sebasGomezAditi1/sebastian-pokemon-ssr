import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/about/about-page')
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page')
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page')
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page')
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon')
  },
  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(AuthService);
      return ''
    }
  }
];

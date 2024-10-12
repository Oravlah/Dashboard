import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { forbiddenGuard } from './shared/guards/forbidden.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/panel/tablas/edit/edit.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/pages/register/register.component'),
  },
  {
    path: '',
    loadComponent: () => import('../app/shared/layouts/layout.component'),

    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'reservar',
        loadComponent: () => import('./pages/reservar/reservar.component'),
      },
      {
        path: 'panel',
        loadComponent: () => import('./pages/panel/panel.component'),
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./pages/panel/dashboard/dashboard.component')
          },
          {
            path: 'tablas',
            loadComponent: () => import('./pages/panel/tablas/tablas.component')
          },
          {
            path: 'estadisticas',
            loadComponent: () => import('./pages/panel/estadisticas/estadisticas.component')
          },
          {
            path: 'guest-register',
            loadComponent: () => import('./shared/components/guest-register/guest-register.component')
          },
        ]
      },
      {
        path: 'administrador',
        loadComponent: () => import('./pages/administrador/administrador.component'),
        canActivate: [forbiddenGuard],
        children: [
          {
            path: 'crear',
            loadComponent: () => import('./pages/administrador/crear/crear.component')
          },
          {
            path: 'editar',
            loadComponent: () => import('./pages/administrador/editar/editar.component')
          },
          {
            path: 'eliminar',
            loadComponent: () => import('./pages/administrador/eliminar/eliminar.component')
          },
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'not-found',
    loadComponent: () => import('../app/shared/errors/not-found/not-found.component')
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('../app/shared/errors/unauthorized/unauthorized.component')
  },
  {
    path: 'internal-server-error',
    loadComponent: () => import('../app/shared/errors/internal-server-error/internal-server-error.component')
  },
  {
    path: 'forbidden',
    loadComponent: () => import('../app/shared/errors/forbidden/forbidden.component')
  },
  {
    path: 'bad-gateway',
    loadComponent: () => import('../app/shared/errors/bad-gateway/bad-gateway.component')
  },
  {
    path: 'service-unavailable',
    loadComponent: () => import('../app/shared/errors/service-unavailable/service-unavailable.component')
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

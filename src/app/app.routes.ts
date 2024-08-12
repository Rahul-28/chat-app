import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/chat/chat.component').then(
        componet => componet.ChatComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        componet => componet.LoginComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        componet => componet.LoginComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        component => component.NotFoundComponent
      ),
  },
];

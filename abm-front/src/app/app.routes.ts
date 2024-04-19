import { Routes } from '@angular/router';
import { UsersComponent } from './modules/users/users.component';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./modules/users/users.component').then((c) => c.UsersComponent),
    title: 'ABM-USERS',
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' },
];

import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './services/auth/auth.guard';
import { Projects } from './dashboard/projects/projects';
import { Tasks } from './dashboard/tasks/tasks';
import { Employees } from './dashboard/employees/employees';

export const routes: Routes = [
    {
        path: '',
        redirectTo: localStorage.getItem('userSession') ? 'dashboard' : 'login',
        pathMatch: 'full'
    },
    { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
    children: [
      { path: 'projects', component: Projects },
      { path: 'tasks', component: Tasks },
      { path: 'employees', component: Employees },
      { path: '', redirectTo: 'projects', pathMatch: 'full' } 
    ]
  },
    { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AuthService } from './login/auth/auth.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: localStorage.getItem('userSession') ? 'dashboard' : 'login',
        pathMatch: 'full'
    },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: '**', redirectTo: '' }
];

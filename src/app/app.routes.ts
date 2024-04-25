import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirige desde la raíz a '/login'
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  // Puedes añadir más rutas aquí
];

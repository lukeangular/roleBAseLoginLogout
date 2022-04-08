import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { AuthGuard } from './_helpers/auth.guard';
import {Role} from 'src/app/_models/role'
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  {
    path: 'client', 
    canActivate: [AuthGuard],
    data: { roles: [Role.Client] },
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

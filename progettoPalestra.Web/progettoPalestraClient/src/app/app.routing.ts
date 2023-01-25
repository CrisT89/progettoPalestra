import { TestComponent } from './components/test-component/test-component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

// Import Components
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './helpers/auth.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ListNotificationsComponent } from './components/notifications/list-notifications/list-notifications.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';

export const routes: Routes = [
  {
    path: '404',
    component: ErrorComponent,
    data: {
      breadcrumbs: 'Error 404'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumbs: 'Login Page'
    }
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    data: {
      breadcrumbs: 'Change Password'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      breadcrumbs: 'Register Page'
    }
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    data: {
      breadcrumbs: 'Errore 404'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumbs: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'core',
        loadChildren: () => import('./components/core/core.module').then(m => m.CoreModule)
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          breadcrumbs: 'Profilo utente'
        },
      },
      {
        path: 'list-notifications',
        component: ListNotificationsComponent,
        data: {
          breadcrumbs: 'NOTIFICHE',
        }
      },
      {
        path: 'test',
        component: TestComponent,
        data: {
          breadcrumbs: 'Test'
        }
      },
      {
        path: 'categories',
        component: ListCategoryComponent,
        data: {
          breadcrumbs: 'Categories'
        }
      }
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { ListArticleComponent } from './components/article/list-article/list-article.component';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import { HomeComponent } from './components/public/home/home.component';
import { ArticleCardsComponent } from './components/public/article-cards/article-cards.component';
import { CartComponent } from './components/public/cart/cart.component';

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
    canActivate: [AuthGuard],
    data: {
      breadcrumbs: 'Change Password'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumbs: 'Register Page'
    }
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumbs: 'Errore 404'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    // canActivate: [AuthGuard],
    data: {
      breadcrumbs: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'core',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/core/core.module').then(m => m.CoreModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
        data: {
          breadcrumbs: 'Profilo utente'
        },
      },
      {
        path: 'list-notifications',
        component: ListNotificationsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumbs: 'NOTIFICHE',
        }
      },
      {
        path: 'test',
        component: TestComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumbs: 'Test'
        }
      },
      {
        path: 'categories',
        component: ListCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumbs: 'Categorie'
        }
      },
      {
        path: 'newcategory',
        component: AddCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumbs: 'Nuova Categoria'
        }
      },
      {
        path: 'newcategory/:id',
        component: AddCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumbs: 'Modifica Categoria'
        }
      },
      {
        path: 'articles',
        component: ListArticleComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumbs: 'Articoli'
        }
      },
      {
        path: 'newarticle',
        component: AddArticleComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumbs: 'Nuovo Articolo'
        }
      },
      {
        path: 'newarticle/:id',
        component: AddArticleComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumbs: 'Modifica Articolo'
        }
      },
      {
        path: 'public-home',
        component: HomeComponent,
        data: {
          breadcrumbs: ''
        },
        children: [
          {
            path: 'articles',
            component: ArticleCardsComponent,
            data: {
              breadcrumbs: 'Tutti gli Articoli'
            }
          },
          {
            path: 'articles/:inEvidence',
            component: ArticleCardsComponent,
            data: {
              breadcrumbs: 'Articoli in Evidenza'
            }
          },
          {
            path: 'articles/byCategory/:id',
            component: ArticleCardsComponent,
            data: {
              breadcrumbs: 'Articoli per Categoria'
            }
          },
          {
            path: 'cart',
            component: CartComponent,
            data: {
              breadcrumbs: 'Carrello'
            }
          }
        ]
      },
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

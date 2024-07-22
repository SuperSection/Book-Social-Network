import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { MainComponent } from './books/pages/main/main.component';
import { BookListComponent } from './books/pages/book-list/book-list.component';
import { MyBooksComponent } from './books/pages/my-books/my-books.component';
import { ManageBookComponent } from './books/pages/manage-book/manage-book.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent,
  },
  {
    path: 'books',
    component: MainComponent,
    children: [
      {
        path: '',
        component: BookListComponent,
      },
      {
        path: 'my-books',
        component: MyBooksComponent,
      },
      {
        path: 'manage',
        component: ManageBookComponent,
      },
      {
        path: 'manage/:bookId',
        component: ManageBookComponent,
      },
    ],
  },
];

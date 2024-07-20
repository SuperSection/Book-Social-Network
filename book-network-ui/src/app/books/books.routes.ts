import { Routes } from '@angular/router';
import { MainComponent } from './books.component';
import { BookListComponent } from './pages/book-list/book-list.component';

export const booksRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: BookListComponent,
      },
    ],
  },
];

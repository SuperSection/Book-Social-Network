import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { BookService } from '../../../services/services';
import { BookResponse, PageResponseBookResponse } from '../../../services/models';
import { BookCardComponent } from "../../components/book-card/book-card.component";
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, BookCardComponent, PaginationComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
})
export class MyBooksComponent extends PaginationComponent {
  constructor(bookService: BookService, router: Router) {
    super(bookService, router);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override findAllBooks() {
    this.bookService
      .findAllBooksByOwner({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (books: PageResponseBookResponse) => {
          this.bookResponse = books;
        },
      });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
  }

  shareBook(book: BookResponse) {
    this.bookService
      .updateShareableStatus({
        'book-id': book.id as number,
      })
      .subscribe({
        next: (): void => {
          book.shareable = !book.shareable;
        },
        error: (error): void => {
          console.error(error);
        },
      });
  }

  archiveBook(book: BookResponse) {
    this.bookService
      .updateArchivedStatus({
        'book-id': book.id as number,
      })
      .subscribe({
        next: (): void => {
          book.archived = !book.archived;
        },
        error: (error): void => {
          console.error(error);
        },
      });
  }
}
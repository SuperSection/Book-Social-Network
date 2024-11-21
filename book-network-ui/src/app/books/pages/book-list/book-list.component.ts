import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import {
  BookResponse,
  PageResponseBookResponse,
} from '../../../services/models';
import { BookService } from '../../../services/services';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, NgIf, BookCardComponent, PaginationComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent extends PaginationComponent<PageResponseBookResponse> {

  constructor(bookService: BookService, router: Router) {
    super(bookService, router);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  message: string = '';
  level: string = 'success';

  borrowBook(book: BookResponse) {
    this.message = '';
    this.bookService
      .borrowBook({
        'book-id': book.id as number,
      })
      .subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Book successfully added to your list.';
        },
        error: (error) => {
          this.level = 'error';
          this.message = error.error.error;
        },
      });
  }

}
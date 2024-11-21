import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  BookResponse,
  BorrowedBookResponse,
  FeedbackRequest,
  PageResponseBorrowedBookResponse,
} from '../../../services/models';
import { BookService } from '../../../services/services';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [NgFor, NgIf, PaginationComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss',
})
export class BorrowedBookListComponent extends PaginationComponent<PageResponseBorrowedBookResponse> {
  constructor(bookService: BookService, router: Router) {
    super(bookService, router);
  }

  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook: BookResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = { bookId: 0, comment: '', rating: 0 };

  override ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  findAllBorrowedBooks() {
    this.bookService
      .findAllBorrowedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (res: PageResponseBorrowedBookResponse) => {
          this.borrowedBooks = res;
        },
      });
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }
}
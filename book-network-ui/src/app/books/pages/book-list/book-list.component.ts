import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../services/services';
import {
  BookResponse,
  PageResponseBookResponse,
} from '../../../services/models';
import { NgFor, NgIf } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, NgIf, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  constructor(private bookService: BookService, private router: Router) {}

  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 4;
  message: string = '';
  level: string = 'success';

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
    this.bookService
      .findAllBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (books: PageResponseBookResponse) => {
          this.bookResponse = books;
        },
      });
  }

  goToFistPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(index: number) {
    this.page = index;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = (this.bookResponse.totalPages as number) - 1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == (this.bookResponse.totalPages as number) - 1;
  }

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
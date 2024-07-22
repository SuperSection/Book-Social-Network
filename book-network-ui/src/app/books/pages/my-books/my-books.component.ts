import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { BookService } from '../../../services/services';
import { BookResponse, PageResponseBookResponse } from '../../../services/models';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, BookCardComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
})
export class MyBooksComponent implements OnInit {
  constructor(private bookService: BookService, private router: Router) {}

  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 4;

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
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

  editBook(book: BookResponse) {}

  shareBook(book: BookResponse) {}

  archiveBook(book: BookResponse) {}

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

}
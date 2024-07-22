import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { BookService } from '../../../services/services';
import { PageResponseBookResponse } from '../../../services/models';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {

  constructor(protected bookService: BookService, protected router: Router) {}
  
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

  get isLastPage(): boolean {
    return this.page == (this.bookResponse.totalPages as number) - 1;
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

}
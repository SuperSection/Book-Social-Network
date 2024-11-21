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
export class PaginationComponent<T extends PageResponseBookResponse> implements OnInit {

  constructor(protected bookService: BookService, protected router: Router) {}
  
  bookResponse: T = {} as T;
  page: number = 0;
  size: number = 4;

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
          this.bookResponse = books as T;
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
    this.page = (this.res.totalPages as number) - 1;
    this.findAllBooks();
  }

}
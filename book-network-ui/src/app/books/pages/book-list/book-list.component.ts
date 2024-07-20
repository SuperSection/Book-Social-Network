import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../services/services';
import { PageResponseBookResponse } from '../../../services/models';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) {}

  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;

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

}
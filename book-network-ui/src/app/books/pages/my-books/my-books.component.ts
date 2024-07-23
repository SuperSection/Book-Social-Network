import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { BookService } from '../../../services/services';
import { BookResponse } from '../../../services/models';
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

  editBook(book: BookResponse) {}

  shareBook(book: BookResponse) {}

  archiveBook(book: BookResponse) {}

}
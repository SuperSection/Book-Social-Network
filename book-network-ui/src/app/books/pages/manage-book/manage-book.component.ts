import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { BookRequest } from '../../../services/models';
import { BookService } from '../../../services/services';
import { createApi } from 'unsplash-js';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    title: '',
    authorName: '',
    isbn: '',
    synopsis: '',
  };
  selectedBookCover: any;
  selectedPicture: string | undefined;
  defaultPhoto: string = '';

  ngOnInit(): void {
    const unsplash = createApi({ accessKey: environment.unsplashAccessKey });

    unsplash.photos
      .getRandom({ orientation: 'portrait', topicIds: ['bo8jQKTaE0Y'] })
      .then((result) => {
        if (result.errors) {
          console.log('Error occurred: ', result.errors[0]);
          this.defaultPhoto = environment.defaultBookCoverUrl;
        } else {
          if (Array.isArray(result.response)) {
            this.defaultPhoto = result.response[0].urls.raw;
          } else {
            this.defaultPhoto = result.response.urls.raw;
          }
        }
      });

    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService
        .findBookById({
          'book-id': bookId,
        })
        .subscribe({
          next: (book) => {
            this.bookRequest = {
              id: book.id,
              title: book.title as string,
              authorName: book.authorName as string,
              isbn: book.isbn as string,
              synopsis: book.synopsis as string,
              shareable: book.shareable,
            };
          },
        });
    }
  }

  onFileSelected(event: Event) {
    this.selectedBookCover = (event.target as HTMLInputElement).files?.item(0);
    console.log(this.selectedBookCover);

    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedBookCover);
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
    }
  }

  saveBook() {
    this.bookService
      .saveBook({
        body: this.bookRequest,
      })
      .subscribe({
        next: (bookId: number) => {
          this.bookService
            .uploadBookCoverPicture({
              'book-id': bookId,
              body: {
                file: this.selectedBookCover,
              },
            })
            .subscribe({
              next: () => {
                this.router.navigate(['/books/my-books']);
              },
            });
        },
        error: (err) => {
          console.log(err.error);
          this.errorMsg = err.error.validationErrors;
        },
      });
  }
}

import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { BookRequest } from '../../../services/models';
import { BookService } from '../../../services/services';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent {

  constructor(private bookService: BookService, private router: Router) {}

  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    title: '',
    authorName: '',
    isbn: '',
    synopsis: '',
  };
  selectedBookCover: any;
  selectedPicture: string | undefined;


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
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { createApi } from 'unsplash-js';

import { BookResponse } from '../../../services/models';
import { RatingComponent } from '../rating/rating.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgIf, RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {

  private _book: BookResponse = {};
  private _manage: boolean = false;
  private _bookCover: string | undefined;

  
  get bookCover(): string | undefined {
    if (this._book.cover) {
      return `data:image/jpg;base64,${this._book.cover}`;

    } else {
      let randomPhoto: string = '';
      const unsplash = createApi({ accessKey: environment.unsplashAccessKey });

      unsplash.photos.getRandom({ orientation: 'portrait' }).then((result) => {
        if (result.errors) {
          console.log('Error occurred: ', result.errors[0]);
          randomPhoto = environment.defaultBookCoverUrl;
        } else {
          if (Array.isArray(result.response)) {
            randomPhoto = result.response[0].urls.full;
          } else {
            randomPhoto = result.response.urls.full;
          }
        }
      });

      return randomPhoto;
    }
  }

  get book() {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }


  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShowDetails() {
    this.details.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }

}
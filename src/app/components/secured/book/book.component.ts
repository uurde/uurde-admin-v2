import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  books: any;
  book;
  pagedBooks = [];
  pageSize = 10;
  p: number = 1;
  userFilter: any = { bookName: '' };

  constructor(private _bookService: BookService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.spinner.show();
    this._bookService.getAllBooks().subscribe(data => {
      this.books = data;
      this.pagedBooks = _.take(this.books, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }

  save() {
    if (this.book.id)
      this._bookService.updateBook(this.books);
    else
      this._bookService.insertBook(this.book);
  }

  deleteBook(book) {
    var index = this.books.indexOf(book)
    this._bookService.deleteBook(book.bookId)
      .subscribe(null,
        err => {
          this.error.fire();
          this.books.splice(index, 0, book);
        },
        () => {
          this.deleted.fire();
          this.books.splice(index, 1);
        });
  }

  select(book) {
    this.book = book;
    this._bookService.getBook(book.bookId)
      .subscribe(
        data =>
          this.book.comments = data,
        null
      );
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedBooks = _.take(_.rest(this.books, startIndex), this.pageSize);
  }

}

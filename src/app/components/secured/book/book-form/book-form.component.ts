import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from 'src/app/services/book.service';
import { BookModel } from '../../../../models/book.model';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  title: string;
  book = new BookModel();
  bookForm: FormGroup;
  path;

  constructor(private _router: Router, private _route: ActivatedRoute, private _bookService: BookService) { }
  ngOnInit() {
    this._route.params.subscribe(params => {
      var id = +params["id"];
      this.title = id ? "Edit Book" : "New Book";
      if (!id)
        return;
      this._bookService.getBook(id).subscribe(
        data => {
          this.book = data as any;
        },
        response => {
          if (response.status == 404) {
            this._router.navigate(['book']);
          }
        }
      );
    });
  }
  save() {
    var result;
    if (this.book.bookId == null)
      result = this._bookService.insertBook(this.book);
    else
      result = this._bookService.updateBook(this.book);

    result.subscribe(x => { this._router.navigate(['book']); });
  }

  cancel() {
    this._router.navigate(['book']);
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { BookService } from 'src/app/services/book.service';
import { BookModel } from '../../../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @ViewChild('saved', { static: false }) private saved: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
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

    result.subscribe(
      x => { 
        this._router.navigate(['book']); 
      },
      err => {
        this.error.fire();
      },
      () => {
        this.saved.fire();
      });
  }

  cancel() {
    this._router.navigate(['book']);
  }


}

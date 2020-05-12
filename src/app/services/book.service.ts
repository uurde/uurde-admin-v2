import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeaderConfig } from 'src/app/services/header.config';
import { BookModel } from '../models/book.model';

@Injectable()
export class BookService {
    headerConfig = new HeaderConfig();

    book: BookModel;
    books: BookModel[];

    private _url = this.headerConfig.url + "/api/books";

    constructor(private _http: HttpClient) {

    }

    getAllBooks() {
        return this._http.get(this._url, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getBook(bookId) {
        return this._http.get(this._url + "/" + bookId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertBook(book) {
        return this._http.post(this._url, book, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    updateBook(book) {
        return this._http.put(this._url, book, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteBook(bookId) {
        return this._http.delete(this._url + "/" + bookId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getUnreadBooks() {
        return this._http.get(this._url + "/GetUnreadBooks", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }
}
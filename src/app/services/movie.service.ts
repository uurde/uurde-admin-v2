import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeaderConfig } from 'src/app/services/header.config';
import { MovieModel } from '../models/movie.model';

@Injectable()
export class MovieService {
    headerConfig = new HeaderConfig();

    movie: MovieModel;
    movies: MovieModel[];

    private _url = this.headerConfig.url + "/api/movies";

    constructor(private _http: HttpClient) {

    }

    getAllMovies() {
        return this._http.get(this._url + "/GetMovieDetails", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getMovie(movieId) {
        return this._http.get(this._url + "/" + movieId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertMovie(movie) {
        return this._http.post(this._url, movie, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    updateMovie(movie) {
        return this._http.put(this._url, movie, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteMovie(movieId) {
        return this._http.delete(this._url + "/" + movieId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getMovieMediaTypes() {
        return this._http.get(this._url + "/GetMovieMediaTypes", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }
}
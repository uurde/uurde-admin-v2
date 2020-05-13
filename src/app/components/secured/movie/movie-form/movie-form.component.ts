import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { MovieService } from 'src/app/services/movie.service';
import { MovieModel } from '../../../../models/movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  @ViewChild('saved', { static: false }) private saved: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  title: string;
  movie = new MovieModel();
  movieForm: FormGroup;
  path;
  movieMediaTypes: any;

  constructor(private _router: Router, private _route: ActivatedRoute, private _movieService: MovieService) {

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var id = +params["id"];
      this.title = id ? "Edit Movie" : "New Movie";
      if (!id)
        return;
      this._movieService.getMovie(id).subscribe(
        data => {
          this.movie = data as any;
        },
        response => {
          if (response.status == 404) {
            this._router.navigate(['movie']);
          }
        }
      );
    });
    this.getMovieMediaTypes();
  }

  selectchange(args) {
    this.movie.movieMediaTypeId = args.target.selectedIndex;
  }

  save() {
    var result;
    if (this.movie.movieId == null)
      result = this._movieService.insertMovie(this.movie);
    else
      result = this._movieService.updateMovie(this.movie);

    result.subscribe(
      x => {
        this._router.navigate(['movie']);
      },
      err => {
        this.error.fire();
      },
      () => {
        this.saved.fire();
      });
  }

  cancel() {
    this._router.navigate(['movie']);
  }

  getMovieMediaTypes() {
    this._movieService.getMovieMediaTypes().subscribe(data => { this.movieMediaTypes = data; }, null);
  }

}

import { BaseModel } from "./base.model";

export class MovieModel extends BaseModel{
    movieId: number;
    movieName: string;
    directorName: string;
    movieReleaseDate: Date;
    moviePosterPath: string;
    movieMediaTypeId: number;
    movieMediaTypeName: string;
    imdbId: string;
    imdbRating: string;
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieList } from './model/movieList';
import { map } from 'rxjs/operators';
import { Movie } from './model/movie';
import { GenreList } from './model/genreList';
import { Genre } from './model/genre';

const url = 'http://localhost:3000/api/movies';
const genreUrl = 'http://localhost:3000/api/genres';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(params?: any): Observable<MovieList> {
    let queryParams = {};

    if (params) {
      queryParams = {
        params: new HttpParams()
          .set('page', params.page || '')
          .set('pageSize', params.pageSize || '')
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || '')
      }
    }
    return this.http.get(url, queryParams).pipe(map(data => {
      return new MovieList(data);
    }))
  }


  getMovie(id: number): Observable<Movie> {
    return this.http.get(url + '/' + id).pipe(map(data => {
      return new Movie(data);
    }))
  }

  getGenres(): Observable<GenreList> {
    return this.http.get(genreUrl).pipe(map(data => {
      return new GenreList(data);
    }))
  }

  editMovie(movie: Movie): Observable<Movie> {
    return this.http.put(url + '/' + movie._id, movie).pipe(map(data => {
      return new Movie(data);
    }))
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post(url, movie).pipe(map(data => {
      return new Movie(data);
    }))
  }

  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post(genreUrl, genre).pipe(map(data => {
      return new Genre(data);
    }))
  }
}

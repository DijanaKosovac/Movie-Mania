import { MovieService } from './../movie.service';
import { MovieList } from './../model/movieList';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: MovieList;
  changeArrow: boolean = true;;
  parameters = {
    page: 1,
    pageSize: 6,
    sort: 'rating',
    sortDirection: 'desc'
  }
  constructor(private service: MovieService) { }

  ngOnInit(): void {
    this.updateMovies();
  }

  updateMovies(params?: any) {

    if (params) {
      this.parameters.page = params.page || this.parameters.page;
      this.parameters.pageSize = params.pageSize || this.parameters.pageSize;
      this.parameters.sort = params.sort || this.parameters.sort;
      this.parameters.sortDirection = params.sortDirection || this.parameters.sortDirection;

    }
    this.service.getMovies(this.parameters).subscribe(data => {
      this.movieList = data;
    })
  }

  updateParams() {
    this.changeArrow = !this.changeArrow;
    if (this.parameters.sortDirection == 'desc') {
      this.parameters.sortDirection = 'asc'
    } else {
      this.parameters.sortDirection = 'desc';
    }
    this.updateMovies();
  }


}

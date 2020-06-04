import { AddMovieComponent } from './../add-movie/add-movie.component';
import { MovieListComponent } from './../movie-list/movie-list.component';
import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: AddMovieComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

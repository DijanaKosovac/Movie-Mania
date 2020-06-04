import { Movie } from './../model/movie';
import { MovieService } from './../movie.service';
import { GenreList } from './../model/genreList';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  genreList: GenreList;
  movie: Movie;
  movieForm: FormGroup;
  showNewForm: boolean = false;
  constructor(private service: MovieService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {

    this.route.params.subscribe(data => {
      let id = +(data['id']);
      if (id) {
        this.service.getMovie(id).subscribe(data => {
          this.movie = data;
          this.movieForm.patchValue(data);
        })
      }
    })
    this.service.getGenres().subscribe(data => {
      this.genreList = data;
    })
  }

  createForm() {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(250)]],
      director: '',
      genre: '',
      year: ['', [Validators.required, Validators.minLength(4)]],
      rating: '',
      duration: '',
      newGenre: ''
    })
  }

  onSubmit() {
    let submittedForm = this.movieForm.value;
    if (this.movie && this.movie._id) {
      submittedForm._id = this.movie._id;
      this.service.editMovie(submittedForm).subscribe(data => {
        this.movie = data;
      })

    } else {
      this.service.addMovie(submittedForm).subscribe(data => {
        this.movie = data;
      })
    }
    this.movie = new Movie();
    this.movieForm.reset();
    this.router.navigate(['/movies']);

  }

  toggleButton() {
    this.showNewForm = !this.showNewForm;
  }

  onAddGenre() {
    let newGenre = this.movieForm.value.newGenre;
    this.service.addGenre({ _id: null, name: newGenre }).subscribe(data => {
      this.genreList.genreList.push(data);
      this.movieForm.controls['genre'].patchValue(data.name);
      this.showNewForm = false;
    })
  }

}

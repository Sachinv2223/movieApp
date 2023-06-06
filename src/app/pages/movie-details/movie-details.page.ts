import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails, MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movieId: any;
  movieDetails!: MovieDetails;
  imgBaseUrl = environment.images;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.getMovieId();
    this.getMovieDetails();
  }

  getMovieId() {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.movieId = param.get('id');
        // console.log(this.movieId);
      }
    })
  }

  getMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.movieDetails = <MovieDetails>res;
      }
    })
  }

  openHomePage(url: any) {
    window.open(url);
  }

}

import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiResult, Movie, MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: Movie[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe({
      next: (res: ApiResult) => {
        loading.dismiss();
        this.movies = [...this.movies, ...res.results];
        console.log(res);

        event?.target.complete();
      }
    })
  }

  loadMore(event: any) {
    // console.log(event);
    this.currentPage++;
    this.loadMovies(event as InfiniteScrollCustomEvent);
  }

}

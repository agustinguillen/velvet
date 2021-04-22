import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[];

  public loading: boolean = true;

  constructor( private router: Router ) { 
    this.loading=false;
  }

  ngOnInit(): void {
    console.log(this.movies)
  }

  onClickPelicula( movie: Movie ){
      this.router.navigate(['/pelicula/', movie.id])
  }

 

}

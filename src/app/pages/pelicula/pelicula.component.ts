import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PeliculaResponse } from 'src/app/interfaces/pelicula-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/creditos-response';
import { combineLatest } from 'rxjs';
import { Result } from 'src/app/interfaces/trailer-response';
import { Resultado } from 'src/app/interfaces/recomendadas-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  @Input() resultado: Resultado[];

  public pelicula: PeliculaResponse;
  public genre: PeliculaResponse;
  public cast: Cast[] = [];
  public trailer: Result[] = [];
  public key: string;
  public baseURL_Trailer: string = 'https://www.youtube.com/embed/';
  public trailerURL:string;
  public recomendadas: Resultado[] = [];

  constructor( private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
  
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculasService.getDetallePelicula( id ),
      this.peliculasService.getGenre( id ),
      this.peliculasService.getCast( id ),
      this.peliculasService.getTrailer( id ),
      this.peliculasService.getRecomendadas( id )
    ]).subscribe( ( [pelicula, genre, cast, trailer, recomendadas] ) =>{
      if(!pelicula){
        this.router.navigateByUrl('/home')
        return;
      }

      this.pelicula = pelicula;

      this.genre = genre;
      
      this.cast = cast.filter(actor => actor.profile_path !== null);

      this.trailer = trailer;
      this.key = trailer[0].key;
      this.trailerURL = `${this.baseURL_Trailer}${this.key}`;
      
      this.recomendadas = recomendadas;
      recomendadas.splice(5);
    } )
    

  }

  regresar(){
    this.location.back();
  }

  onClickPelicula( movie: Resultado ){
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }
   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         
         this.router.navigated = false;
         
         window.scrollTo(0, 0);
      }
    });

    this.router.navigate(['/pelicula/', movie.id]);
  }

}

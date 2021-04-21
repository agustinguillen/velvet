import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Cast, CreditosResponse } from '../interfaces/creditos-response';
import { PeliculaResponse } from '../interfaces/pelicula-response';
import { Resultado, RecomendadasResponse } from '../interfaces/recomendadas-response';
import { Result, TrailerResponse } from '../interfaces/trailer-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL: string = 'https://api.themoviedb.org/3';
  private baseURL_Trailer:string = 'https://www.youtube.com/watch?v=';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params(){
    return{
      api_key: '20a1327a930e37d6c689f84bb265a470',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  get params2(){
    return{
      api_key: '20a1327a930e37d6c689f84bb265a470',
      language: 'es-ES'
    }
  }



  resetCartelera(){
      this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]>{

      if(this.cargando){
          return of([]);
      }


      this.cargando = true;

      return this.http.get<CarteleraResponse>(`${this.baseURL}/movie/now_playing`, {
        params: this.params
      }).pipe(
        map( (resp) => resp.results ),
          tap(()=> {
            this.carteleraPage += 1
            this.cargando = false;
          })
        );

    }

    buscarPeliculas(texto:string):Observable<Movie[]>{

        const params = {...this.params, page: '1', query: texto};

        return this.http.get<CarteleraResponse>(`${ this.baseURL }/search/movie`, { 
          params
         }).pipe(
           map( resp => resp.results)
         )
    }

    getDetallePelicula( id:string ){
        return this.http.get<PeliculaResponse>(`${this.baseURL}/movie/${ id }`,{
          params: this.params
        }).pipe(
            catchError(err => of(null))
            );
    }

    getGenre( id:string ){
      return this.http.get<PeliculaResponse>(`${this.baseURL}/movie/${ id }`,{
        params: this.params
      }).pipe(
          map(resp => resp.genres),
          catchError(err => of(null))
          );
    }

    getCast( id:string ):Observable<Cast[]>{
      return this.http.get<CreditosResponse>(`${this.baseURL}/movie/${ id }/credits`,{
        params: this.params
      }).pipe(
          map(resp => resp.cast),
          catchError(err => of([]))
          
          )};

    getTrailer( id:string ):Observable<Result[]>{
      return this.http.get<TrailerResponse>(`${this.baseURL}/movie/${ id }/videos`, {
        params: this.params
      }).pipe(
        map(resp => resp.results),
        catchError(err => of([]))
      )};

    
      getRecomendadas( id:string ):Observable<Resultado[]>{
        return this.http.get<RecomendadasResponse>(`${this.baseURL}/movie/${ id }/recommendations`,{
          params: this.params
        }).pipe(
            map(resp => resp.results),
            catchError(err => of([]))
            
            )};
      
  
}

import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Filtradas} from '../../interfaces/peliculas-genero-response';


@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {
  
  public id: string = '';
  public peliculas_genero:Filtradas[];
  public pagina:number = 2;

  constructor( private activatedRoute: ActivatedRoute,
    private PeliculasService: PeliculasService,
    private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{

      this.id = params.id;

      this.PeliculasService.buscarPeliculasGenero( params.id, "1" ).subscribe( movies => {
        this.peliculas_genero = movies;
      } )
    })
  } 
  
  cargarMasPeliculas(){
    if(this.PeliculasService.cargando){
      return
    }

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.pagina=2;
      }})

    this.PeliculasService.buscarPeliculasGenero(this.id, `${this.pagina}`).subscribe( movies => {
      this.peliculas_genero.push(...movies)
      } );
    console.log(this.pagina)
    this.pagina++;
  }
  

}

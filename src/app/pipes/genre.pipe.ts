import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  
  transform(id: string): string {
    switch(id){
        case '28':
                    return 'Acción';
        case '12':
                    return 'Animación';
        case '16': 
                    return 'Aventura';
        case '10752': 
                    return 'Bélica';
        case '878': 
                    return 'Ciencia Ficción';
        case '35': 
                    return 'Comedia';
        case '80': 
                    return 'Crimen';
        case '99': 
                    return 'Documental';
        case '18': 
                    return 'Drama';
        case '9648': 
                    return 'Misterio';
        case '53': 
                    return 'Suspenso';
        case '27': 
                    return 'Terror';
        default:
                    return 'Error'
    }
  }

}
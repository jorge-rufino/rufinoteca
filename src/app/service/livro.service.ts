import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  //Quanto fazemos requisicoes com o "get", podemos usar operadores para trabalhar os dados de retorno.
  //O "pipe" é um operador que permite utilizar vários outros operadores em conjunto para trabalhar os dados.
  //O "tap" é um operador utilizado APENAS para visualizar/espionar os dados, não afeta em mais nada.
  //O "map" é um operador que transforma os dados, no caso, pegamos os dados da api e os converter em "LivrosResultado"
  //e com o map pegamos apenas os "itens" e retornamos como resultado do método "buscar".
  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valorDigitado )
    return this.http.get<LivrosResultado>(this.API, { params })
  }
}

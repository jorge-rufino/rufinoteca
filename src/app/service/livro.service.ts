import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  //Quanto fazemos requisicoes com o "get", podemos usar operadores para trabalhar os dados de retorno.
  //O "pipe" é um operador que permite utilizar vários outros operadores em conjunto para trabalhar os dados
  //O "tap" é um operador utilizado APENAS para visualizar/espionar os dados, não afeta em mais nada
  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap((respostaAPI) => console.log(respostaAPI))
    )
  }
}

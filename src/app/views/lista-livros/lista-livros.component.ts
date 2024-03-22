import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { switchMap, map, filter, debounceTime, tap, distinctUntilChanged, bufferCount, catchError, throwError, EMPTY } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 500; //Tempo dem milisegundos

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{

  campoBusca = new FormControl();
  mensagemErro = '';

  constructor(private service: LivroService) { }

  //É uma convensão usar "$" quando temos uma variavel que representa um "Observable".
  //O "switchMap" só faz a requisição ao servidor quando terminarmos de escrever.
  //Com "filter", os demais pipes só irão ser chamados quando a condição for válida.
  //O "debounceTime" é um delay para a execução do próximo operador, assim evitamos varias requisiçoes ao servidor ao digitar.
  //O "distinctUntilChanged" guarda o ultimo valor válido e caso ele se repita evita a requisiçao.
  //O "Empty" cria um Observable simples que não emite nenhum item para o Observer e que emite imediatamente uma notificação de
  //"Complete". Como não iremos fazer nada com o erro, ele pode ser vazio "()"

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap(valorDigitado => this.service.buscar(valorDigitado)),
    tap(respostaApi => console.log(respostaApi)),
    map(items => this.livrosResultadoParaLivros(items)),
    catchError(() => {
      this.mensagemErro = 'Ocorreu um erro inesperado! Recarregue a aplicação!'
      return EMPTY;
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}




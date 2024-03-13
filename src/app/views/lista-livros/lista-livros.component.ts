import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { switchMap, map } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{

  campoBusca = new FormControl();

  constructor(private service: LivroService) { }

  //É uma convensão usar "$" quando temos uma variavel que representa um "Observable"
  //O "switchMap" só faz a requisição ao servidor quando terminarmos de escrever
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    switchMap(valorDigitado => this.service.buscar(valorDigitado)),
    map(items => this.livrosResultadoParaLivros(items))
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}




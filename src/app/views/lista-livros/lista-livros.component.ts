import { LivrosResultado, VolumeInfo, ImageLinks, Item } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';
import { Livro } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[];
  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
            next: respostaAPI => this.listaLivros =  this.livrosResultadoParaLivros(respostaAPI),
            error: erro => console.log(erro),
          }
        )
  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}




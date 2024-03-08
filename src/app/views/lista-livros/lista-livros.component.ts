import { LivrosResultado, VolumeInfo, ImageLinks, Item } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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

  livrosResultadoParaLivros(items): Livro[]{
    const livros: Livro[] = [];

    items.forEach(element => {
      livros.push(this.livro = {
        title: element.volumeInfo?.title,
        authors: element.volumeInfo?.authors,
        publisher: element.volumeInfo?.publisher,
        publishedDate: element.volumeInfo?.publishedDate,
        description: element.volumeInfo?.description,
        previewLink: element.volumeInfo?.previewLink,
        thumbnail: element.volumeInfo?.imageLinks?.thumbnail
      })
    });

    return livros;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}




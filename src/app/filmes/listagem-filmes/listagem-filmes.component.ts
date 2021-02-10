import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  pagina = 0;
  texto: string;
  genero: string;
  readonly qtdPagina = 4;
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private FilmesService: FilmesService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
      this.filtrosListagem = this.fb.group({
          texto: [''],
          genero: ['']
      });

      //Filtro por busca textual
      this.filtrosListagem.get('texto').valueChanges.subscribe((val: string) => {
          this.texto = val;
          this.resetarConsulta();
      })

      //Filtro por gênero
      this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
        this.genero = val;
        this.resetarConsulta();
      })

      this.generos = ["Ação", "Aventura", "Ficção Científica", "Romance", "Terror", "Comédia", "Drama"];

      this.listarFilmes();
    }

  onScroll(): void {
      this.listarFilmes();
  }

  private listarFilmes(): void {
        this.pagina++;
        this.FilmesService.listar(this.pagina, this.qtdPagina, this.texto, this.genero).subscribe((filmes: Filme[]) => {this.filmes.push(...filmes)});
  }
  
  private resetarConsulta(): void{
      this.pagina = 0;
      this.filmes = [];
      this.listarFilmes();
  }
}

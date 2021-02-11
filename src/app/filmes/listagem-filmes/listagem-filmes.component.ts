import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  
    readonly semFoto = "https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg";
    config: ConfigParams = {
        pagina: 0,
        limite: 4
    }
    filmes: Filme[] = [];
    texto: string;
    genero: string;
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
        this.filtrosListagem.get('texto').valueChanges
        //Requisições a cada 400ms
        .pipe(debounceTime(400))
        .subscribe((val: string) => {
            this.config.pesquisa = val;
            this.resetarConsulta();
        })

        //Filtro por gênero
        this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
            this.config.campo = {tipo: "genero", valor: `${val}`};
            this.resetarConsulta();
        })

        this.generos = ["Ação", "Aventura", "Ficção Científica", "Romance", "Terror", "Comédia", "Drama"];

        this.listarFilmes();
        }

    onScroll(): void {
        this.listarFilmes();
    }

    private listarFilmes(): void {
            this.config.pagina++;
            this.FilmesService.listar(this.config).subscribe((filmes: Filme[]) => {this.filmes.push(...filmes)});
    }

    private resetarConsulta(): void{
        this.config.pagina = 0;
        this.filmes = [];
        this.listarFilmes();
    }
}

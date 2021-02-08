import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { MatDialog } from '@angular/material';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(  public validacao: ValidarCamposService,
                public dialog: MatDialog,
                private fb: FormBuilder,
                private filmesService: FilmesService) { }

  get f(){
      return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', Validators.minLength(10)],
      dtLancamento: ['', Validators.required],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', Validators.minLength(10)],
      genero: ['', Validators.required]
    });

    this.generos = ["Ação", "Aventura", "Ficção Científica", "Romance", "Terror", "Comédia", "Drama"];
   }
    
    submit(): void {
        if(this.cadastro.invalid){
            return;
        }
        //Campos do cadatro serão atribuídos a constante filme
        const filme = this.cadastro.getRawValue() as Filme;
        this.salvar(filme);
        this.reiniciarForm();
    }

    reiniciarForm(): void{
        this.cadastro.reset()
    }

    private salvar(filme: Filme): void{
        this.filmesService.salvar(filme).subscribe(() => {
            const dialogRef = this.dialog.open(AlertaComponent);
            
        },
        () => {
            alert("Erro ao salvar!")
        })
    }
}

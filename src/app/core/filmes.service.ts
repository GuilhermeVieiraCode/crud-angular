import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';
import { ConfigParams } from '../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';

const url = "http://localhost:3000/filmes/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient,
              private configPS: ConfigParamsService ) { }

  salvar(filme: Filme) : Observable<Filme> {
      return this.http.post<Filme>(url, filme);
  }

  listar(config: ConfigParams): Observable<Filme[]>{
      const configParams = this.configPS.configurarParametros(config);
      return this.http.get<Filme[]>(url, {params: configParams});
  }
}

export interface Filme {
    //Campos com ? são opcionais
    id?: number;
    titulo: string;
    urlFoto?: string;
    dtLancamento: Date;
    descricao?: string;
    nota: number;
    urlIMDb?: string;
    genero: string;
}

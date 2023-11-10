import { StorageService } from "./storage.service.js";

export class DisciplinaService {
  keyName = "disciplinas";
  constructor() {
    this.storageService = new StorageService();
    this.disciplinas = this.storageService.carregar(this.keyName) ?? [];
  }

  buscar(nomeDaDisciplina) {
    for (let posicao = 0; posicao < this.disciplinas.length; posicao++) {
      const elementoNaPosicao = this.disciplinas[posicao];
      const { nome } = elementoNaPosicao;
      if (nome === nomeDaDisciplina) {
        return elementoNaPosicao;
      }
    }
  }

  editarDisciplina (disciplinaEdit) {
    const disciplinaEditada = this.disciplinas.find(
      (disciplina) => disciplina.id === disciplinaEdit.id
    );
    if (disciplinaEditada === undefined) {
      throw new ConflictException(`Disciplina ${disciplinaEditada.nome} não existe`);
    }
    this.disciplinas[disciplinaEditada] = disciplinaEdit;
    this._salvar();
  }

  pegarDisciplinas() {
    return this.disciplinas;
  }

  cadastrar(disciplina) {
    if (this.buscar(disciplina.nome)) {
      throw new UsernameConflictException();
    }

    this._salvar();
  }

  _salvar() {
    try {
      this.storageService.salvar(this.keyName, this.disciplinas);
    } catch (error) {
      throw new StorageServiceException(error.message);
    }
  }
}

import { StorageServiceException } from "../exception/exceptions.js";
import { StorageService } from "./storage.service.js";
import {
  ConflictException,
  UserNameConflictException,
} from "../exception/exceptions.js";

export class TurmaService {
  keyName = "turmas";
  constructor() {
    this.storageService = new StorageService();
    this.turmas = this.storageService.carregar(this.keyName) ?? [];
  }

  buscar(idTurma) {
    for (let posicao = 0; posicao < this.turmas.length; posicao++) {
      const elementoNaPosicao = this.turmas[posicao];
      const { id } = elementoNaPosicao;
      if (id === idTurma) {
        return elementoNaPosicao;
      }
    }
  }

  pegarTurmas() {
    return this.turmas;
  }

  editarTurma(turmaEditada) {
    const turmaASerEditada = this.turmas.find(
      (turma) => turma.id === turmaEditada.id
    );
    if (turmaASerEditada === undefined) {
      throw new ConflictException(`Turma ${turmaEditada.nome} não existe`);
    }
    this.turmas[turmaASerEditada] = turmaEditada;
    this._salvar();
  }

  cadastrar(turma) {
    if (this.buscar(turma.nome)) {
      throw new UserNameConflictException();
    }

    this.usuarios.push(new Usuario(nomeDeUsuario, senha, tipoDeUsuario));
    this._salvar();
  }

  _salvar() {
    try {
      this.storageService.salvar(this.keyName, this.turmas);
    } catch (error) {
      throw new StorageServiceException(error.message);
    }
  }
}

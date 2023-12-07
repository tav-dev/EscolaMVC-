import { Avaliacao } from "../entity/avaliacao.js";
import { StorageService } from "./storage.service.js";

export class AvaliacaoService {
  keyName = "avaliacões";
  constructor() {
    this.storageService = new StorageService();
    this.avaliacoes = this.storageService.carregar(this.keyName) ?? [];
  }

  salvarAvaliacao(disciplinaID, alunoID, tipoDaAvaliacao, nota) {
    this.avaliacoes.push(
      new Avaliacao(disciplinaID, alunoID, tipoDaAvaliacao, nota)
    );
    this._salvar();
  }

  _salvar() {
    try {
      this.storageService.salvar(this.keyName, this.avaliacoes);
    } catch (error) {
      throw new StorageServiceException(error.message);
    }
  }
}

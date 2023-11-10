
import { Disciplina } from "../entity/disciplina.js";
import { Turma } from "../entity/turma.js";
import { TipoDeUsuario } from "../entity/usuario.js";
import { StorageService } from "./storage.service.js";

export class SecretariaService {
  disciplinasKey = "disciplinas";
  turmasKey = "turmas";
  turmasConfiguradasKey = 'turmasConfiguradas' 

  //Lembrar de adicionar diasDaSemana
  constructor() {
    this.storageService = new StorageService();
    this.tipoDeUsuario = new TipoDeUsuario();
    this.turmas = this.storageService.carregar(this.turmasKey) ?? [];
    this.disciplinas = this.storageService.carregar(this.disciplinasKey) ?? [];
  }


  buscarDisciplina(nome) {
    for (let posicao = 0; posicao < this.disciplinas.length; posicao++) {
      const elementoNaPosicao = this.disciplinas[posicao];
      console.log(elementoNaPosicao);
      if (elementoNaPosicao.nome === nome) {
        return elementoNaPosicao;
      }
    }
  }

  buscarTurma() {
    for (let posicao = 0; posicao < this.turmas.length; posicao++) {
      const elementoNaPosicao = this.turmas[posicao];
      return elementoNaPosicao
    }
  }

  buscarTurmas() {
    for (let posicao = 0; posicao < this.turmas.length; posicao++) {
      const elementoNaPosicao = this.turmas;
      return elementoNaPosicao;
    }
  }

  salvarTurma(nome, id) {
      if(this.buscarTurma(nome)) 
      this.turmas.push(new Turma(nome, id))
      this._salvar()
  }

  buscarDisciplinas() {
    for (let posicao = 0; posicao < this.disciplinas.length; posicao++) {
      const elementoNaPosicao = this.disciplinas;
      return elementoNaPosicao;
    }
  }

  cadastrarDisciplina(disciplina) {
    if (this.buscarDisciplina(disciplina)) {
      throw new UsernameConflictException();
    }

    this.disciplinas.push(new Disciplina(disciplina));
    this._salvar();
  }
  cadastrarTurma(turma) {
    if (this.buscarTurma(turma)) {
      throw new UsernameConflictException();
    }

    this.turmas.push(new Turma(turma));
    this._salvar();
  }

  /* 
      @throws StorageServiceException
       */
  _salvar() {
    try {
      this.storageService.salvar(this.turmasKey, this.turmas);
      this.storageService.salvar(this.disciplinasKey, this.disciplinas);
    } catch (error) {
      throw new StorageServiceException(error.message);
    }
  }
}

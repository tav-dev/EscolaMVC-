import { FriendlyException } from "../model/exception/exceptions.js";
import { AvaliacaoService } from "../model/service/avaliacao.service.js";
import { DisciplinaService } from "../model/service/disciplina.service.js";
import { TurmaService } from "../model/service/turma.service.js";
import { UsuarioService } from "../model/service/usuario.service.js";

export class SecretariaController {
  constructor() {
    this.usuarioService = new UsuarioService();
    this.turmaService = new TurmaService();
    this.disciplinaService = new DisciplinaService();
    this.avaliacaoService = new AvaliacaoService()
  }

  cadastrarDisciplinas(nomeDeDisciplina) {
    try {
      const disciplina = this.secretariaService.cadastrarDisciplina(nomeDeDisciplina);
      
      console.log(disciplina);
    } catch (error) {
      console.error(error);
    }
  }

  cadastrarTurma(nomeDaTurma) {
    try {
      const turmas = this.secretariaService.cadastrarTurma(nomeDaTurma);
      console.log(turmas);
    } catch (error) {
      console.error(error); // tratar erros depois
    }
  }

  salvarTurmaEditada(turma) {
    try {
      this.turmaService.editarTurma(turma)
    } catch (e) {
      throw new FriendlyException()
    }
  }

  salvarDisciplinaEditada(disciplina) {
    try {
      this.disciplinaService.editarDisciplina(disciplina)
    } catch (e) {
      console.log(e)
      throw new FriendlyException()
    }
  }
  


  pegarTurmas() {
    return this.turmaService.pegarTurmas();
  }

  pegarDisciplinas( usuarioID ) {
    return this.disciplinaService.pegarDisciplinas(usuarioID);
  }


  salvarAvaliacao( disciplinaID, alunoID,tipoDaAvaliacao, nota) {
    this.avaliacaoService.salvarAvaliacao( disciplinaID, alunoID,tipoDaAvaliacao, nota )
  }
  // configurarTurma(turma) {
  //   try {
  //       const turmas = this.secretariaService.buscarTurma(turma)
  //       console.log(turmas)
  //   } catch (error) {
  //       console.error(error) // tratar erros depois
  //   }

  // }
}

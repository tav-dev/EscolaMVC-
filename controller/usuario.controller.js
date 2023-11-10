import { TipoDeUsuario } from "../model/entity/usuario.js";
import {
  FriendlyException,
  InvalidUserTypeException,
  InvalidCredentialsException,
} from "../model/exception/exceptions.js";
import { UsuarioService } from "../model/service/usuario.service.js";

 export class UsuarioController {
  constructor() {
    this.usuarioService = new UsuarioService();
  }

  login(nomeDeUsuario, senha) {
    try {
      const usuario = this.usuarioService.login(nomeDeUsuario, senha);
      switch (usuario.tipoDeUsuario) {
        case TipoDeUsuario.Professor:
          window.location.href = "../usuario/professor/professor.html";
          break;
        case TipoDeUsuario.Aluno:
          window.location.href = "../usuario/aluno/Aluno.html";
          break;
        case TipoDeUsuario.Auxiliar:
          window.location.href = "../secretaria/secretaria.html";
          break;
        default:
          throw new InvalidUserTypeException(
            `Tipo de usuário ${usuario.tipoDeUsuario} inválido`
          );
      }
    } catch (error) {
      console.error(error); //tratar (enviar p backend, etc)

      if (error instanceof InvalidCredentialsException) {
        throw new FriendlyException(error.message);
      }

      throw new FriendlyException();
    }
  }

  existe(nomeDeUsuario) {
    return this.usuarioService.buscar(nomeDeUsuario);
  }

  cadastrar(nomeDeUsuario, senha, tipoDeUsuario) {
    try {
      return this.usuarioService.cadastrar(nomeDeUsuario, senha, tipoDeUsuario);
    } catch (error) {
      console.error(error); //tratar (enviar p backend, etc)
      throw new FriendlyException();
    }
  }

  pegarProfessores() {
    return this.buscarUsuario(TipoDeUsuario.Professor);
  }
  
  pegarAlunos() {
    return this.buscarUsuario(TipoDeUsuario.Aluno);
  }

  buscarUsuario(tipoDeUsuario) {
    try {
      return this.usuarioService.pegarUsuario(tipoDeUsuario);
    } catch (error) {
      throw new FriendlyException();
    }
  }
}

export default UsuarioController

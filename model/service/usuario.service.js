import { TipoDeUsuario, Usuario } from "../entity/usuario.js";
import {
  InvalidCredentialsException,
  StorageServiceException,
  UserNameConflictException,
} from "../exception/exceptions.js";
import { StorageService } from "./storage.service.js";

export class UsuarioService {
  usuariosKey = "usuarios";
  userLoginKey = 'userSession'
  userLogin 

  //TODO transformar em propriedades da classe
  constructor() {
    this.storageService = new StorageService();
    this.tipoDeUsuario = new TipoDeUsuario();
    this.usuarios = this.storageService.carregar(this.usuariosKey) ?? [];
    this.userLogin = this.storageService.carregar(this.userLoginKey) ?? null
  }
  
  login(nomeDeUsuario, senha) {
    const usuario = this.buscar(nomeDeUsuario);
    
    if (senha !== usuario?.senha) {
      throw new InvalidCredentialsException();
    }
    this.userLogin = usuario
    this.storageService.salvar(this.userLoginKey, this.userLogin);
    return usuario;
  }
  
  logout() {
    this.userLogin = null
  }

  buscar(nomeDeUsuario, tipoDeUsuario) {
    for (let posicao = 0; posicao < this.usuarios.length; posicao++) {
      const elementoNaPosicao = this.usuarios[posicao];
      const { nome, senha, tipo } = elementoNaPosicao;
      if (nome === nomeDeUsuario) {
        return elementoNaPosicao;
      }
    }
  }

  pegarUsuario(tipoDeUsuario) {
    return this.usuarios.filter(usuario => usuario.tipoDeUsuario === tipoDeUsuario)
  }

  /* 
  @throws StorageServiceException
   */
  cadastrar(nomeDeUsuario, senha, tipoDeUsuario) {
    if (this.buscar(nomeDeUsuario)) {
      throw new UserNameConflictException();
    }

    this.usuarios.push(new Usuario(nomeDeUsuario, senha, tipoDeUsuario));
    this._salvar();
  }

  /* 
  @throws StorageServiceException
   */
  _salvar() {
    try {
      this.storageService.salvar(this.usuariosKey, this.usuarios);
      
    } catch (error) {
      throw new StorageServiceException(error.message);
    }
  }
}

export class TipoDeUsuario {
  static Auxiliar = 'Auxiliar'
  static Aluno = 'Aluno'
  static Professor = 'Professor'
}

export class Usuario {

  constructor(nome, senha, tipoDeUsuario, id = crypto.randomUUID()) {
    this.id = id
    this.nome = nome
    this.senha = senha
    this.tipoDeUsuario = tipoDeUsuario
  }
}

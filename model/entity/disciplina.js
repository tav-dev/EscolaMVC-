export class Disciplina {
    inicio
    fim
    // tipoDeUsuario 
    diasDaSemana
    constructor(nome, id = crypto.randomUUID()) {
        this.nome = nome
        this.id = id
    }
}


export class Professor{
    constructor(disciplina, turma, aluno, avaliacao) {
        this.disciplina = disciplina 
        this.turma = turma 
        this.aluno = aluno
        this.avaliacao = avaliacao
        this.id = id
    }
}
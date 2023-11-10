
export class Turma {
    disciplinas
    inicio
    fim
    diasDaSemana
    alunos

    constructor(nome, id = crypto.randomUUID()) {
        this.nome = nome
        this.id = id
    }
}
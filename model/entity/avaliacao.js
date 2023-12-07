export class TipoDeAvaliacao {
                static P1 = 'P1'
                static P2 = 'P2'
                static P3 = 'P3'
                static P4 = 'P4'
              }
              


export class Avaliacao {

                
        constructor( disciplinaID ,alunoID,tipoDeAvaliacao,nota, id = crypto.randomUUID() ) {
                this.alunoID = alunoID       
                this.disciplinaID = disciplinaID
                this.tipoDeAvaliacao = tipoDeAvaliacao
                this.nota = nota
                this.id = id
        }        

}
import { SecretariaService } from "../../../model/service/secretaria.service.js"

const inputCadastroTurma = document.querySelector('#inputCadastroTurma')
const buttonSalvar = document.querySelector('#buttonSalvar')
const labelErro = document.querySelector('#labelErro')

buttonSalvar.addEventListener('click', cadastrarTurma) 

function cadastrarTurma() {

    const turmas = new SecretariaService()

    const nomeDeturma = inputCadastroTurma.value
    
    try {
        turmas.cadastrarTurma(nomeDeturma)
    } catch (error) {
            labelErro.textContent = error.message
    }

}
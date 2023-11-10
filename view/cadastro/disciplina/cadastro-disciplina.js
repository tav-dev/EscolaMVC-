import { SecretariaService } from "../../../model/service/secretaria.service.js"

const inputCadastroDisciplina = document.querySelector('#inputCadastroDisciplina')
const buttonSalvar = document.querySelector('#buttonSalvar')
const labelErro = document.querySelector('#labelErro')

buttonSalvar.addEventListener('click', cadastrarDisciplina) 

function cadastrarDisciplina() {

    const disciplinas = new SecretariaService()

    const nomeDeDisciplina = inputCadastroDisciplina.value
    
    try {
        disciplinas.cadastrarDisciplina(nomeDeDisciplina)
    } catch (error) {
            labelErro.textContent = error.message
    }

}
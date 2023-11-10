import { SecretariaController } from "../../../controller/secretaria.controller.js";
import { UsuarioController } from "../../../controller/usuario.controller.js";

const limpar = document.querySelector("#clear");
const selectDisciplina = document.querySelector("#selectDisciplina");
const inputInicio = document.querySelector("#inicio");
const inputTermino = document.querySelector("#termino");
const selectProfessor = document.querySelector("#selectProfessor");
const btnSalvar = document.querySelector("#buttonSalvar");
const labelErro = document.querySelector("#labelErro");

btnSalvar.addEventListener('click', salvarDisciplinaConfigurada)

const secretariaController = new SecretariaController();
const usuarioController = new UsuarioController();

const professores = usuarioController.pegarProfessores();
const disciplinas = secretariaController.pegarDisciplinas();

selectDisciplina.onchange = function() {
  const disciplinaSelect = pegarDisciplinaSelecionada()

  inputInicio.value = disciplinaSelect.inicio ?? null
  inputTermino.value = disciplinaSelect.termino ?? null
  selectProfessor.selectedIndex = 0

  let indicieSalvo 
  if(disciplinaSelect.professor) {
    for(let posicao = 0; posicao < selectProfessor.options.length; posicao++) {
      if(selectProfessor.options[posicao].id === disciplinaSelect.professor.id) {
        indicieSalvo = posicao
        break;
      }
    }
    selectProfessor.selectedIndex = indicieSalvo
  }

}

function mostrarDisciplinas() {
  for (let disciplina of disciplinas) {
    const option = document.createElement("option");
    option.textContent = disciplina.nome;
    option.id = disciplina.id;
    option.value = disciplina.nome;
    selectDisciplina.appendChild(option);
  }
}
mostrarDisciplinas();

function mostrarProfessores() {
  for (let professor of professores) {
    const option = document.createElement("option");
    option.textContent = professor.nome;
    option.id = professor.id;
    option.value = professor.nome;
    selectProfessor.appendChild(option);
  }
}
mostrarProfessores();

function pegarDisciplinaSelecionada() {
    const optionSelectedDisciplina = selectDisciplina.options[selectDisciplina.selectedIndex]
    // console.log(optionSelectedDisciplina)
    return disciplinas.find(disciplina => disciplina.id === optionSelectedDisciplina.id)
}

function pegarProfessor() {
  const optionSelectedProfessor = selectProfessor.options[selectProfessor.selectedIndex]
  return professores.find(professor => professor.id === optionSelectedProfessor.id)
}

function salvarDisciplinaConfigurada() {
    const disciplinaSelecionada = pegarDisciplinaSelecionada()

    disciplinaSelecionada.inicio = inputInicio.value
    disciplinaSelecionada.termino = inputTermino.value
    disciplinaSelecionada.professor = pegarProfessor()

    try {
      secretariaController.salvarDisciplinaEditada(disciplinaSelecionada)
    } catch (error) {
      labelErro.textContent = error.message
    }
}

import { SecretariaController } from "../../../controller/secretaria.controller.js";
import { Disciplina } from "../../../model/entity/disciplina.js";
import { Turma } from "../../../model/entity/turma.js";

const selectTurma = document.querySelector("#selectTurma");
const inicio = document.querySelector("#inicio");
const termino = document.querySelector("#termino");
const selectDisciplina = document.querySelector("#selectDisciplina");
const renderDisciplinas = document.querySelector("#render-disciplina");
const addBtn = document.querySelector("#btn-adicionar");
const buttonSalvar = document.querySelector("#buttonSalvar");
const disciplinaDisplay = document.querySelector("#disciplinaDisplay");
const labelError = document.querySelector("#labelErro");
const limparCampos = document.querySelector('#clear')

addBtn.addEventListener("click", addDisciplina);
buttonSalvar.addEventListener("click", salvarTurmaConfigurada);
limparCampos.addEventListener("click", limpa)

const secretariaController = new SecretariaController();
const disciplinas = secretariaController.pegarDisciplinas();
const turmas = secretariaController.pegarTurmas();
let disciplinasEscolhidas = [];

selectTurma.onchange = () => {
  const turmaRecuperada = turmaSelecionada()
  console.log(turmaRecuperada)
  if(!turmaRecuperada)
  return 
  inicio.value = turmaRecuperada.inicio ?? null
  termino.value = turmaRecuperada.fim ?? null
  disciplinaDisplay.style.display = "block";
  disciplinasEscolhidas = turmaRecuperada.disciplinas ?? []
  atualizarTabela()
}

function mostrarTurmas() {
  
  for (let turma of turmas) {
    const option = document.createElement("option");
    option.textContent = turma.nome;
    option.id = turma.id;
    option.value = turma.nome;
    selectTurma.appendChild(option);
  }
}
mostrarTurmas();


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

function addDisciplina() {
  const optionSelecionada = selectDisciplina.options[selectDisciplina.selectedIndex]
  disciplinasEscolhidas.push(new Disciplina(optionSelecionada.value, optionSelecionada.id));
  atualizarTabela();
}

function turmaSelecionada() {
  const optionSelecionada = selectTurma.options[selectTurma.selectedIndex];
  const turmaSelecionada = turmas.find(turma => turma.id === optionSelecionada.id
  );
  return turmaSelecionada;
}

function excluirDisciplinaSelecionada (e) {
 const buttonExcluir = e.target.id
 const disciplinaExluir = disciplinasEscolhidas.find(disciplina => disciplina.id === buttonExcluir)
 disciplinasEscolhidas.splice(disciplinaExluir,1)
 atualizarTabela()
}

function salvarTurmaConfigurada() {
  const turmaConfigurada = turmaSelecionada();
  turmaConfigurada.inicio = inicio.value;
  turmaConfigurada.fim = termino.value;
  turmaConfigurada.disciplinas = disciplinasEscolhidas;
  
  try {
    secretariaController.salvarTurmaEditada(turmaConfigurada);
  } catch (error) {
    labelError.textContent = error.message;
  }
}

function atualizarTabela() {
  renderDisciplinas.innerHTML = "";
  for (let disciplina of disciplinasEscolhidas) {
    const tr = document.createElement("tr");
    const tdDisciplina = document.createElement("td");
    
    tdDisciplina.textContent = disciplina.nome;

    const botaoX = document.createElement("button")
    botaoX.id = disciplina.id
    botaoX.textContent = ' X '
    botaoX.onclick = excluirDisciplinaSelecionada
  
    tr.appendChild(tdDisciplina);
    tr.appendChild(botaoX);
    
    renderDisciplinas.appendChild(tr);
  }

 }

 function limpa() {
   inicio.value = undefined
   termino.value = undefined
   renderDisciplinas.innerHTML = ''
   selectTurma.selectedIndex = 0
   disciplinaDisplay.style.display = "none";

}

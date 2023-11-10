import { SecretariaController } from "../../../controller/secretaria.controller.js";
import UsuarioController from "../../../controller/usuario.controller.js";
import { Usuario } from "../../../model/entity/usuario.js";

const selectTurma = document.querySelector("#selectTurma");
const selectAluno = document.querySelector("#selectAluno");
const addButton = document.querySelector("#btn-adicionar");
const salvarButton = document.querySelector("#buttonSalvar");
const labelError = document.querySelector("#labelErro");
const renderAlunos = document.querySelector("#render-aluno");

const secretariaController = new SecretariaController();
const usuarioController = new UsuarioController();
const alunos = usuarioController.pegarAlunos();
const turmas = secretariaController.pegarTurmas();

addButton.addEventListener("click", addAlunoSelecionado);
salvarButton.addEventListener("click", salvarEdicao);

let alunoSelecionados = [];

selectTurma.onchange = () => {
  const turmaRecuperada = turmaSelecionada()
  alunoSelecionados = turmaRecuperada.alunos
  atualizarTabela()
};

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

function mostrarAlunos() {
  for (let aluno of alunos) {
    const option = document.createElement("option");
    option.textContent = aluno.nome;
    option.id = aluno.id;
    option.value = aluno.nome;
    selectAluno.appendChild(option);
  }
}
mostrarAlunos();

function addAlunoSelecionado() {
  const optionSelect = selectAluno.options[selectAluno.selectedIndex];
   const alunoEncontrado = alunos.find(aluno => aluno.id === optionSelect.id)
    alunoSelecionados.push(alunoEncontrado)
  atualizarTabela();
}

function turmaSelecionada() {
  const optionSelecionada = selectTurma.options[selectTurma.selectedIndex];
  const turmaSelecionada = turmas.find((turma) => turma.id === optionSelecionada.id);
  return turmaSelecionada;
}

function atualizarTabela() {
  renderAlunos.innerHTML = "";

  for (let aluno of alunoSelecionados) {
    const tr = document.createElement("tr");
    const tdAlunos = document.createElement("td");

    tdAlunos.textContent = aluno.nome;
    const botaoX = document.createElement("button");
    botaoX.id = aluno.id;
    botaoX.textContent = " X ";
    botaoX.onclick = excluirAlunoSelecionado;

    tr.appendChild(tdAlunos);
    tr.appendChild(botaoX);

    renderAlunos.appendChild(tr);
  }
}
function excluirAlunoSelecionado(e) {
  const buttonExcluir = e.target.id;
  const excluirAlunosSelecionados = alunoSelecionados.find(
    (aluno) => aluno.id === buttonExcluir
  );
  alunoSelecionados.splice(excluirAlunosSelecionados, 1);
  atualizarTabela();
}

function salvarEdicao() {
  const turmaSelect = turmaSelecionada();
  turmaSelect.alunos = alunoSelecionados;

  try {
    secretariaController.salvarTurmaEditada(turmaSelect);
  } catch (error) {
    labelError.textContent = error.message;
  }
}

import { UsuarioController } from "../../../controller/usuario.controller.js";
import { SecretariaController } from "../../../controller/secretaria.controller.js";
import { sectionUser } from "../../section/sectionUser.js";
import { TipoDeAvaliacao } from "../../../model/entity/avaliacao.js";

const selectDisciplina = document.querySelector("#selectDisciplina");
const turmaRadio = document.querySelector("#turmaRadio");
const turmasRender = document.querySelector("#turmas-disciplina");
const alunosRender = document.querySelector("#aluno-turma");
const userLogin = document.querySelector('#sectionUser')
const  btnSalvar  = document.querySelector('#buttonSalvar')
const  btnLogout  = document.querySelector('#logout')
const selectAvaliacao = document.querySelector('#tipoAvaliacao')
const notaInput = document.querySelector('#nota')


const secretariaController = new SecretariaController();
const usuarioController = new UsuarioController();
const usuarioID = usuarioController.pegarUserLogado().id


const disciplinas = secretariaController.pegarDisciplinas(usuarioID);
const turmas = secretariaController.pegarTurmas();

btnSalvar.addEventListener('click', salvarAvaliacao)
btnLogout.addEventListener('click', logout)

function carregarDisciplinas() {
  for (let disciplina of disciplinas) {
    const option = document.createElement("option");
    option.textContent = disciplina.nome;
    option.id = disciplina.id;
    option.value = disciplina.nome;
    selectDisciplina.appendChild(option);
  }
}

carregarDisciplinas();

function disciplinaPorId() {
  const optionSelecionada = selectDisciplina.options[selectDisciplina.selectedIndex];
  return disciplinas.find((disciplina) => disciplina.id === optionSelecionada.id);
}

function avaliacaoSelecionada() {
  const tipoDaAvaliacao = (Object.values(TipoDeAvaliacao))
  ['P1', 'P2', 'P3', 'P4']

 const optionSelecionada = selectAvaliacao.options[selectAvaliacao.selectedIndex].value
 console.log(tipoDaAvaliacao)
 return tipoDaAvaliacao.find((tipo)  => tipo  === optionSelecionada)


}

selectDisciplina.onchange = () => {
  const disciplinaSelecionadaPorId = disciplinaPorId();

  const arrTurmaDiciplinaEscolhida = [];

  turmas.forEach((turma) => {
    if (
      turma.disciplinas.find(
        (disciplina) => disciplina.id === disciplinaSelecionadaPorId.id
      )
    ) {
      arrTurmaDiciplinaEscolhida.push(turma);
    }
  });
  atualizarInfoTurmasPorDisciplina(arrTurmaDiciplinaEscolhida);
  atualizarAlunosPorTurma(arrTurmaDiciplinaEscolhida);
};

function atualizarInfoTurmasPorDisciplina(arrTurmaDiciplinaEscolhida) {
  turmasRender.innerHTML = "";
  arrTurmaDiciplinaEscolhida.forEach((turma) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    td.textContent = turma.nome;
    td.id = turma.id;

    const inputRadio = document.createElement("input");
    inputRadio.type = "radio";
    inputRadio.setAttribute("name", "turmaRadio");
    inputRadio.textContent = turma.nome;
    inputRadio.value = turma.id;
    inputRadio.id = turma.id;
    inputRadio.onclick = () => {
      atualizarAlunosPorTurma(arrTurmaDiciplinaEscolhida, turma.id);
    };

    tr.appendChild(td);
    tr.appendChild(inputRadio);
    turmasRender.appendChild(tr);
  });

}

let alunoSelecionadoID;

function atualizarAlunosPorTurma(arrTurmaDiciplinaEscolhida, turmaId) {
  alunosRender.innerHTML = "";
  const alunosDaTurma = arrTurmaDiciplinaEscolhida.find(
    (turma) => turma.id === turmaId
  );


  if (alunosDaTurma) {
    alunosDaTurma.alunos.forEach((aluno) => {

      const tr = document.createElement("tr");
      const td = document.createElement("td");

      td.textContent = aluno.nome;
      td.id = aluno.id;

      const inputRadio = document.createElement("input");
      inputRadio.type = "radio";
      inputRadio.setAttribute("name", "alunoRadio");
      inputRadio.textContent = aluno.nome;
      inputRadio.value = aluno.id;
      inputRadio.id = aluno.id;
      inputRadio.addEventListener('click',function() {
        alunoSelecionadoID = this.value;
      })

      tr.appendChild(td);
      tr.append(inputRadio);
      alunosRender.appendChild(tr);
    });
  }
}

function mostrarTipoDeAvaliacao() {

  const tipoDaAvaliacao = (Object.values( TipoDeAvaliacao))
  // console.log(tipoDaAvaliacao)

  for (const valor of tipoDaAvaliacao ) {
    const option =  document.createElement('option')
    option.value = valor
    option.text = valor
    selectAvaliacao.appendChild(option)
  }
  
}
mostrarTipoDeAvaliacao()

function salvarAvaliacao() {
  const disciplinaID = disciplinaPorId()
  const optionAvaliacaoSelecionada = avaliacaoSelecionada()
  console.log(optionAvaliacaoSelecionada)
  const nota = notaInput.value
  // console.log(disciplinaID.id)
  const avaliacao = secretariaController.salvarAvaliacao(disciplinaID.id ,alunoSelecionadoID, optionAvaliacaoSelecionada,nota)
}

function logout (){
  usuarioController.logout()

}

sectionUser(userLogin)


// Corrigir Master
// Corrigir Logout
// Select de Avaliacao e Input nota ao trocar de Aluno/turma 
// Area do Aluno
import { UsuarioController } from "../../../controller/usuario.controller.js";
import { SecretariaController } from "../../../controller/secretaria.controller.js";

const selectDisciplina = document.querySelector("#selectDisciplina");
const turmaRadio = document.querySelector("#turmaRadio");
const turmasRender = document.querySelector("#turmas-disciplina");
const alunosRender = document.querySelector("#aluno-turma");

const secretariaController = new SecretariaController();
const usuarioController = new UsuarioController();
const disciplinas = secretariaController.pegarDisciplinas();
const turmas = secretariaController.pegarTurmas();

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
  const optionSelecionada =
    selectDisciplina.options[selectDisciplina.selectedIndex];
  return disciplinas.find(
    (disciplina) => disciplina.id === optionSelecionada.id
  );
}

selectDisciplina.onchange = () => {
  const disciplinaSelecionadaPorId = disciplinaPorId();

  const arrTurmaDiciplinaEscolhida = [];

  turmas.forEach((turma) => {
    if ( turma.disciplinas.find((disciplina) => disciplina.id === disciplinaSelecionadaPorId.id)) {
      arrTurmaDiciplinaEscolhida.push(turma);
    }
  });
  atualizarInfoTurmasPorDisciplina(arrTurmaDiciplinaEscolhida);
  atualizarAlunosPorTurma(arrTurmaDiciplinaEscolhida)
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
      atualizarAlunosPorTurma(arrTurmaDiciplinaEscolhida, turma.id)
    }

    tr.appendChild(td);
    tr.appendChild(inputRadio);
    turmasRender.appendChild(tr);

  });
}

function atualizarAlunosPorTurma (arrTurmaDiciplinaEscolhida, turmaId) {
  alunosRender.innerHTML = ""
  const alunosDaTurma = arrTurmaDiciplinaEscolhida.find((turma) => turma.id === turmaId);
  // console.log(alunosDaTurma.id)

  if(alunosDaTurma) {
    alunosDaTurma.alunos.forEach(aluno => {
      // console.log(turmaId)
      const tr = document.createElement('tr')
      const td = document. createElement('td')
  
      td.textContent = aluno.nome
      td.id = aluno.id
  
      const inputRadio = document.createElement("input");
      inputRadio.type = "radio";
      inputRadio.setAttribute("name", "alunoRadio");
      inputRadio.textContent = aluno.nome;
      inputRadio.value = aluno.id;
      inputRadio.id = aluno.id;
    
      tr.appendChild(td)
      tr.append(inputRadio)
      alunosRender.appendChild(tr)
    })
  
  }

}




// import { UsuarioController } from "../../../controller/usuario.controller.js";
// import { SecretariaController } from "../../../controller/secretaria.controller.js";

// const selecDisciplina = document.querySelector("#selecDisciplina");
// const turmaRadio = document.querySelector("#turmaRadio");
// const turmasRender = document.querySelector("#turmas-disciplina");
// const alunoRender = document.querySelector("#aluno-turma");

// const secretariaController = new SecretariaController();
// const usuarioController = new UsuarioController();
// const disciplinas = secretariaController.pegarDisciplinas();
// const turmas = secretariaController.pegarTurmas();

// selecDisciplina.onchange = () => {
//   turmasPorDiciplinaSelecionada();
// };

// function carregarDisciplinas() {
//   for (let disciplina of disciplinas) {
//     const option = document.createElement("option");
//     option.textContent = disciplina.nome;
//     option.id = disciplina.id;
//     option.value = disciplina.nome;
//     selecDisciplina.appendChild(option);

//   }
// }
// carregarDisciplinas();

// function turmasPorDiciplinaSelecionada() {
//   const optionSelecionada = selecDisciplina.options[selecDisciplina.selectedIndex];

//   turmasRender.innerHTML = "";
//   for (let turma of turmas) {
//     const diciplinaPorTurma = turma.disciplinas;

//     for (let disciplina of diciplinaPorTurma) {
//       if (disciplina.id === optionSelecionada.id) {
//         const tr = document.createElement("tr");
//         const tdTurmas = document.createElement("td");

//         tdTurmas.textContent = turma.nome;
//         tdTurmas.id = turma.id;

//         const inputRadio = document.createElement("input");
//         inputRadio.type = "radio";
//         inputRadio.setAttribute("name", "boolean");
//         inputRadio.textContent = turma.nome;
//         inputRadio.value = turma.nome;
//         inputRadio.id = turma.id;
//         inputRadio.onclick = () => {
//           alunoPorTurmaSelecionada(turma.id);
//         };

//         tr.appendChild(tdTurmas);
//         tr.appendChild(inputRadio);
//         turmasRender.appendChild(tr);
//       }
//     }
//   }
// }

// //   const radioId = radio.children.Boolean.id;
// function alunoPorTurmaSelecionada(turmaId) {
//   const alunosDaTurma = turmas.find((turma) => turma.id === turmaId).alunos;

//   alunoRender.innerHTML = "";
//   for (let aluno of alunosDaTurma) {
//     if (alunosDaTurma) {
//       const tr = document.createElement("tr");
//       const tdAluno = document.createElement("td");

//       tdAluno.textContent = aluno.nome;
//       tdAluno.id = aluno.id;

//       const inputRadio = document.createElement("input");
//       inputRadio.type = "radio";
//       inputRadio.setAttribute("name", "Boolean");
//       inputRadio.textContent = aluno.nome;
//       inputRadio.value = aluno.nome;
//       inputRadio.id = aluno.id;

//       tr.appendChild(tdAluno);
//       tr.appendChild(inputRadio);
//       alunoRender.appendChild(tr);
//     }
//   }
// }

// function salvarProfessorConfigurado() {

// }

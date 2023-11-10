//cria o escopo 'run'
console.log('Carrengado programa escola')


const buttonLogarUsuarios = document.querySelector('#buttonLogarUsuarios')

buttonLogarUsuarios?.addEventListener('click', logarUsuarios)


export const usuarios = [] //string[]

function logarUsuarios() {
    console.log('Usuários: ', usuarios);
    console.log(window.location);
}

//padrões de desenvolvimento

//1 - em nível de aplicação - dentro do app

//como eu organizo a apliçação

//MVC - Model, View, Controller

//View -camada de exibição - exibe as informações e registra as ações
//Model - camada de modelagem - modela os dados e a lógica de manipulação (business logic) dos mesmos separadamente
//Controller - camada de controle - faz ponte entre view e model de modo a traduzir os dados entre ambas



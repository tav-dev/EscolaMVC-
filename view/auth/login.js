import UsuarioController from "../../controller/usuario.controller.js"

function carregarLogin() {
  const inputUsuario = document.querySelector('#inputUsuario')
  const inputSenha = document.querySelector('#inputSenha')
  const buttonEntrar = document.querySelector('#buttonEntrar')
  const labelErro = document.querySelector('#labelErro')

  buttonEntrar.addEventListener('click', login)

  const controller = new UsuarioController()

  function login() {
    try {
      controller.login(inputUsuario.value, inputSenha.value)
      labelErro.textContent = null

    } catch (e) {
      labelErro.textContent = e.message
    }
  }

}

carregarLogin()
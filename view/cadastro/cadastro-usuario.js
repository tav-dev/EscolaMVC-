import { UsuarioService } from "../../model/service/usuario.service.js"
console.log('cadastro de usuario')

const inputNomeDeUsuario = document.querySelector('#inputNomeDeUsuario')
const selectUsuario = document.querySelector('#selectUsuario')
const buttonSalvar = document.querySelector('#buttonSalvar')
const buttonVoltar = document.querySelector('#buttonVoltar')
const labelErro = document.querySelector('#labelErro')

buttonSalvar.addEventListener('click', cadastrarUsuario)

function cadastrarUsuario() {
    console.log('cadastrando usuário');

    const usuarios = new UsuarioService()
    

    const nomeDeUsuario = inputNomeDeUsuario.value
    const tipoDeUsuario = selectUsuario.value

    console.log('nome de usuário: ', nomeDeUsuario);
    console.log('select usuário: ', tipoDeUsuario)

try {
    usuarios.cadastrar(nomeDeUsuario,'123',tipoDeUsuario)
    console.log('Usuarios: ', usuarios)
} catch (error) {
    labelErro.textContent = error.message
}

    // escolaControle.cadastrarUsuario(usuario)
}


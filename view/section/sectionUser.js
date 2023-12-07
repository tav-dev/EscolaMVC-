import { UsuarioController } from "../../controller/usuario.controller.js"

export function sectionUser (userLogin) {
                const userController = new UsuarioController()
                const usuario  = userController.pegarUserLogado()

                const  h4 = document.createElement('h4')
                h4.textContent = 'Usuário: ' + usuario?.nome ??  'test1212312313'
                userLogin.appendChild(h4)

}
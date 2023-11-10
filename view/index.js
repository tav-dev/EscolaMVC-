import { TipoDeUsuario } from "../model/entity/usuario.js"
import { UsuarioService } from "../model/service/usuario.service.js"

function inicializar() {
 

  const usuarioService = new UsuarioService()
  if (!usuarioService.buscar('master')) {
    usuarioService.cadastrar('master', 'master123', TipoDeUsuario.Auxiliar)
  }

}

inicializar()
export class StorageService {
  /* 
  @throws "QuotaExceedError" DOMException
   */
  salvar(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados))
  }

  carregar(chave) {
    return JSON.parse(localStorage.getItem(chave))
  }
} 
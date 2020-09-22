/* eslint-disable no-underscore-dangle */
import RestService from '../../../services/RestService';

class ContatoService extends RestService {
  listarContatos(page = 1, perPage = 15) {
    return this.httpClient.get('contatos', {
      params: {
        skip: page - 1,
        limit: perPage,
      },
    });
  }

  obterContatoPorId(id) {
    return this.httpClient.get(`contatos/${id}`);
  }

  criarContato(contato) {
    return this.httpClient.post('contatos', contato);
  }

  atualizarContato(contato) {
    return this.httpClient.put(`contatos/${contato._id}`, contato);
  }

  deletarContato(contato) {
    return this.httpClient.delete(`contatos/${contato._id}`, contato);
  }
}

export default new ContatoService();

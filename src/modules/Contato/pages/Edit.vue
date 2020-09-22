<template>
  <t-page title="Editar contato">
    <Form
      :contato="contato"
      @novoEndereco="novoEndereco()"
      @removerEndereco="removerEndereco"
      @salvar="atualizarContato"></Form>
  </t-page>
</template>

<script>
import Contato from '../models/Contato';
import contatoService from '../services/ContatoService';
import Form from '../components/Form.vue';

export default {
  components: {
    Form,
  },
  data() {
    return {
      contato: new Contato(),
    };
  },
  methods: {
    obterContato() {
      const contatoId = this.$route.params.id;
      contatoService.obterContatoPorId(contatoId).then(({ data }) => {
        this.contato = new Contato(data);
      });
    },
    atualizarContato() {
      contatoService.atualizarContato(this.contato).then(() => {
        this.$notification.success('Contato atualizado com sucesso.');
        this.$router.push({
          name: 'contato.list',
        });
      }).catch(() => {
        this.$notification.error('Ops, um erro aconteceu, tente novamente.');
      });
    },
    novoEndereco() {
      this.contato.enderecos.push({});
    },
    removerEndereco(endereco) {
      this.contato.enderecos = this.contato.enderecos.filter((e) => e !== endereco);
    },
  },
  created() {
    this.obterContato();
  },
};

</script>

<style>

</style>

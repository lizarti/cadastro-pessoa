<template>
  <t-page title="Contatos">
    <t-resource-list
      name="Contato"
      :showTitle="false"
      :data="contatos"
      :columns="columns"
      :actions="actions"
      :pagination="pagination"
      @paginate="updatePagination"
      @action="resolveAction">

        <template v-slot:newItemButton="props">
          <t-button color="blue" @click="novoContato()">
            <template v-slot:prepend>
              <t-icon type="plus"></t-icon>
            </template>
            Novo {{ props.name.toLowerCase() }}
          </t-button>
        </template>

        <template v-slot:[`table.item.foto`]="item">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" :src="item.foto" :alt="item.name" />
            </div>
          </div>
        </template>
    </t-resource-list>
  </t-page>
</template>

<script>
import Contato from '../models/Contato';
import contatoService from '../services/ContatoService';

export default {
  name: 'user.list',
  props: ['name'],
  data: () => ({
    pagination: {
      page: 1,
      perPage: 15,
      total: 0,
    },
    contatos: [],
    columns: [
      {
        label: '',
        field: 'foto',
        width: '64px',
      },
      {
        label: 'Tipo',
        field: 'tipo_pessoa',
        format: (val) => (val === 'F' ? 'Pessoa física' : 'Pessoa jurídica'),
      },
      {
        label: 'Nome',
        field: 'nome',
      },
      {
        label: 'Email',
        field: 'email',
      },
      {
        label: 'Cadastrado em',
        field: '_createdOn',
        format: (val) => new Date(val).toLocaleDateString(),
      },
    ],
    actions: [
      {
        name: 'edit',
        label: 'Editar',
      },
      {
        name: 'del',
        label: 'Excluir',
      },
    ],
  }),
  methods: {
    obterContatos() {
      const { page, perPage } = this.pagination;
      /* como a paginação vai ser feita localmente, pegarei todos os registros */
      contatoService.listarContatos(page, 100).then(({ data }) => {
        this.pagination.total = data.length;
        this.contatos = data
          .slice((page - 1) * perPage, page * perPage)
          .map((contato) => new Contato(contato));
      });
    },
    novoContato() {
      this.$router.push({
        name: 'contato.new',
      });
    },
    deletarContato(contato) {
      this.$dialog.confirm({
        title: 'Excluir',
        content: `Tem certeza que deseja excluir contato ${contato.nome}?`,
        options: {
          okButton: 'Excluir',
          okButtonColor: 'red',
        },
      }).then((excluir) => {
        if (excluir) {
          contatoService.deletarContato(contato).then(() => {
            this.$notification.success('Contato excluído com sucesso.');
            this.contatos = this.contatos.filter((c) => c !== contato);
          }).catch(() => {
            this.$notification.error('Ops, um erro aconteceu, tente novamente.');
          });
        }
      });
    },
    resolveAction(payload) {
      const { action, row } = payload;
      if (action.name === 'edit') {
        this.$router.push({
          name: 'contato.edit',
          params: {
            // eslint-disable-next-line no-underscore-dangle
            id: row._id,
          },
        });
      }
      if (action.name === 'del') {
        this.deletarContato(row);
      }
    },
    updatePagination(pagination) {
      this.pagination = pagination;
    },
  },
  created() {
    this.obterContatos();
  },
};
</script>

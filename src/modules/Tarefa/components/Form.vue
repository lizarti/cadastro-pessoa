<template>
  <div>

    <div class="bg-white shadow sm:rounded-md">

      <t-form-header title="Tarefa" subtitle="Informações lindas"></t-form-header>

      <div class="p-4 border-b border-gray-200">
        <t-form
          :model="tarefa"
          :form="form"
          :grid="grid"
          @submit="enviar()">
        </t-form>
      </div>
    </div>

  </div>
</template>

<script>
import Tarefa from '../models/Tarefa';

export default {
  props: {
    tarefa: {
      type: Tarefa,
      required: true,
      default() {
        return new Tarefa();
      },
    },
  },
  data() {
    return {
      grid: {
        inicio: 'md:w-1/2',
        termino: 'md:w-1/2',
        duracao: 'md:w-1/2 lg:w-1/4',
      },
      form: {
        name: 'Main',
        fields: {
          nome: {
            label: 'Nome',
            type: 'text',
            rules: {
              required: true,
              minLength: 3,
              maxLength: 8,
            },
          },
          inicio: {
            label: 'Inicio',
            type: 'date',
            rules: {
              required: true,
            },
          },
          termino: {
            label: 'Término',
            type: 'date',
            rules: {
              required: true,
            },
          },
          duracao: {
            label: 'Duração (dias)',
            type: 'text',
          },
          responsavel: {
            label: 'Responsável',
            type: 'select',
            optionText: 'name',
            optionValue: 'id',
            prependIcon: 'user',
            options: [
              {
                id: 1,
                name: 'George Clooley',
              },
              {
                id: 2,
                name: 'Renée Zellweger',
              },
            ],
            rules: {
              required: true,
            },
          },
        },
      },
    };
  },
  methods: {
    getResponsaveis() {
      this.form.fields.responsavel.options = [
        {
          id: 1,
          name: 'George Clooley',
        },
        {
          id: 2,
          name: 'Renée Zellweger',
        },
      ].map((o) => o.name);
    },
  },
  computed: {
  },
  mounted() {
    this.getResponsaveis();
  },
};
</script>

<style>

</style>

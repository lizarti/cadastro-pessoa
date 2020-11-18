<template>
  <t-page title="Nova tarefa">
    <Form
      :tarefa="tarefa"></Form>
  </t-page>
</template>

<script>
import Tarefa from '../models/Tarefa';
import Form from '../components/Form.vue';

export default {
  name: 'New',
  components: {
    Form,
  },
  data() {
    return {
      tarefa: new Tarefa({
        nome: '',
        inicio: new Date().toISOString().slice(0, 10),
      }),
    };
  },
  methods: {
  },
};

</script>

<style>

</style>

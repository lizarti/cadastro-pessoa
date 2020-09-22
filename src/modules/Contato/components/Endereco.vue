<template>
  <div class="border-l-2 pl-2 border-orange-500">

    <div class="flex">
      <t-form-group label="Identificador" class="md:w-1/3 lg:w-1/4">
        <t-text-field
          v-model="endereco.identificador"
          placeholder="Casa, trabalho, etc.">
        </t-text-field>
      </t-form-group>

      <t-button text color="red" @click="$emit('del')" v-if="!unico">
        <template v-slot:prepend>
          <t-icon type="trash"></t-icon>
        </template>
      </t-button>

    </div>

    <div class="flex flex-wrap">
      <div class="flex-grow">
        <t-form-group label="Logradouro">
          <t-text-field
            v-model="endereco.logradouro">
          </t-text-field>
          <template v-slot:errors>
            <p v-if="!$v.endereco.logradouro.required">O campo é obrigatório.</p>
          </template>
        </t-form-group>
      </div>

      <div class="flex w-full lg:w-1/4">

        <t-form-group label="Número">
          <t-text-field
            v-model="endereco.numero"
            type="number"
            :mask="{
              mask: Number
            }">
          </t-text-field>
          <template v-slot:errors>
            <p v-if="!$v.endereco.numero.required">O campo é obrigatório.</p>
          </template>
        </t-form-group>

        <t-form-group label="Complemento">
          <t-text-field
            v-model="endereco.complemento">
          </t-text-field>
        </t-form-group>

      </div>

    </div>

    <div class="flex flex-wrap">
      <t-form-group label="CEP" class="md:w-1/2 lg:w-1/4">
        <t-text-field
          v-model="endereco.cep">
        </t-text-field>
      </t-form-group>

      <t-form-group label="UF" class="md:w-1/2 lg:w-1/4">
        <t-select
          :options="ufs"
          title="nome"
          returnValue="sigla"
          label="UF"
          v-model="endereco.uf"></t-select>
        <template v-slot:errors>
          <p v-if="!$v.endereco.uf.required">O campo é obrigatório.</p>
        </template>
      </t-form-group>

      <t-form-group label="Cidade" class="md:w-1/2 lg:w-1/4">
        <t-text-field
          v-model="endereco.cidade">
        </t-text-field>
        <template v-slot:errors>
          <p v-if="!$v.endereco.cidade.required">O campo é obrigatório.</p>
        </template>
      </t-form-group>

      <t-form-group label="Bairro" class="md:w-1/2 lg:w-1/4">
        <t-text-field
          v-model="endereco.bairro">
        </t-text-field>
      </t-form-group>

    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import ufs from '@/utils/ufs.json';

export default {
  props: {
    endereco: Object,
    unico: Boolean,
  },
  data() {
    return {
      ufs: ufs.UF,
    };
  },
  validations: {
    endereco: {
      logradouro: {
        required,
      },
      numero: {
        required,
      },
      uf: {
        required,
      },
      cidade: {
        required,
      },
    },
  },
};
</script>

<style>

</style>

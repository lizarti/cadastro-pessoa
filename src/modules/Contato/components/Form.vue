<template>
  <div>

    <div class="bg-white shadow sm:rounded-md">
      <div class="px-4 py-5 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Contato
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          Informações básicas do contato
        </p>
      </div>

      <div class="flex flex-col p-4 border-b border-gray-200">

        <t-form-group label="Tipo de pessoa">
          <t-radio
            v-model="contato.tipo_pessoa"
            name="tipo_pessoa"
            value="F"
            label="Pessoa física"></t-radio>
          <t-radio
            v-model="contato.tipo_pessoa"
            name="tipo_pessoa"
            value="J"
            label="Pessoa jurídica"></t-radio>
        </t-form-group>

        <t-form-group :label="labelTipoDocumento" class="md:w-1/3 lg:w-1/4">
          <t-text-field
            v-model="contato.documento_valor"
            ref="documentoValor"
            :mask="tipoPessoaFisica ? '000.000.000-00' : '00.000.000/0000-00'"
            key="cpf">
          </t-text-field>
          <template v-slot:errors>
            <p v-if="!$v.contato.documento_valor.required">O campo é obrigatório.</p>
            <p
              v-if="!$v.contato.documento_valor.minLength || !$v.contato.documento_valor.maxLength">
              O campo precisa ser um {{ labelTipoDocumento }} válido.
            </p>
          </template>
        </t-form-group>

        <t-form-group label="Nome">
          <t-text-field v-model="contato.nome">
          </t-text-field>
          <template v-slot:errors>
            <p v-if="!$v.contato.nome.required">O campo é obrigatório.</p>
          </template>
        </t-form-group>

        <t-form-group label="Razão social" v-if="!tipoPessoaFisica">
          <t-text-field v-model="contato.razao_social">
          </t-text-field>
          <template v-slot:errors>
            <p v-if="!$v.contato.razao_social.required">O campo é obrigatório.</p>
          </template>
        </t-form-group>

        <t-form-group label="Email">
          <t-text-field v-model="contato.email"></t-text-field>
        </t-form-group>

        <t-form-group label="Data de nascimento" v-if="tipoPessoaFisica">
          <t-text-field
            v-model="contato.data_nascimento"
            type="date"></t-text-field>
          <template v-slot:errors>
            <p v-if="!$v.contato.data_nascimento.required">O campo é obrigatório.</p>
          </template>
        </t-form-group>

        <t-form-group label="Sexo" v-if="tipoPessoaFisica" class="md:w-1/3 lg:w-1/4">
          <t-select
            :options="opcoesSexo"
            title="label"
            label="Sexo"
            v-model="contato.sexo"></t-select>
            <template v-slot:errors>
            <p v-if="!$v.contato.sexo.required">O campo é obrigatório.</p>
          </template>
        </t-form-group>

        <div class="flex">
          <t-form-group label="Celular" class="md:w-1/3 lg:w-1/4">
            <t-text-field
              v-model="contato.celular"
              mask="(00) [0]00000000">
            </t-text-field>
          </t-form-group>

          <t-form-group label="Telefone" class="md:w-1/3 lg:w-1/4">
            <t-text-field
              v-model="contato.telefone"
              type="tel"
              mask="(00) 00000000"></t-text-field>
          </t-form-group>

        </div>

        <div class="px-2 mb-2 w-full z-10">
          <span class="text-sm leading-5 font-medium text-gray-700">
            Foto
          </span>

          <div class="mt-2 w-32">
            <picture-input
              width="128"
              height="128"
              margin="4"
              accept="image/jpeg,image/png"
              size="10"
              @change="onUploadPhoto"
              :prefill="contato.foto"
              :prefillOptions="{
                mediaType: 'image/png',
              }"
              hideChangeButton
              :custom-strings="{
                drag: 'Arraste uma foto ou clique para selecionar'
              }">
            </picture-input>
          </div>

          <t-button text color="orange" @click="contato.foto = null" v-if="contato.foto">
            Remover foto
          </t-button>

        </div>
      </div>

      <div>

        <h3 class="ml-8 mt-4 mb-2 text-lg leading-6 font-medium text-gray-800">Endereços</h3>

        <div class="flex flex-col p-4">
          <div v-for="(endereco, index) in contato.enderecos" :key="index">
            <div
              class="mb-2 pb-2 border-gray-200"
              :class="{'border-b' : contato.enderecos.length > 1}">
              <Endereco
                :endereco="endereco"
                @del="removerEndereco(endereco)"
                ref="enderecos"
                :unico="contato.enderecos.length === 1"></Endereco>
            </div>
          </div>

          <div>
            <t-button text color="blue" @click="novoEndereco()">
              <template v-slot:prepend>
                <t-icon type="plus"></t-icon>
              </template>
              Novo endereço
            </t-button>
          </div>
        </div>

      </div>
    </div>

    <div class="my-4 flex justify-end">
      <div>
        <span
          v-if="!isFormValid()"
          class="text-xs text-red-600 font-semibold mr-4">
         Alguns campos não estão preenchidos corretamente.
        </span>
        <t-button color="blue" @click="salvarContato()" :disabled="!isFormValid()">
          <template v-slot:prepend>
            <t-icon type="save"></t-icon>
          </template>
          {{ editando ? 'Atualizar' : 'Criar'}}
        </t-button>
      </div>
    </div>

  </div>
</template>

<script>
import {
  required,
  requiredIf,
} from 'vuelidate/lib/validators';
import Contato from '../models/Contato';
import Endereco from './Endereco.vue';

export default {
  components: {
    Endereco,
  },
  props: {
    contato: {
      type: Contato,
      required: true,
      default() {
        return new Contato();
      },
    },
  },
  data() {
    return {
      opcoesSexo: [
        {
          label: 'Masculino',
        },
        {
          label: 'Feminino',
        },
        {
          label: 'Outro',
        },
      ],
    };
  },
  methods: {
    novoEndereco() {
      this.$emit('novoEndereco');
    },
    removerEndereco(endereco) {
      this.$emit('removerEndereco', endereco);
    },
    salvarContato() {
      if (!this.$v.invalid) {
        this.$emit('salvar');
      }
    },
    /* precisa ser um método pois utiliza-se de $refs */
    isFormValid() {
      /* esse formulário e os endereços (filhos) */
      console.log(this.$refs.enderecos);
      if (this.$refs.enderecos && this.$refs.enderecos.length) {
        return !this.$v.$invalid && this.$refs.enderecos.every((e) => !(e.$v.$invalid));
      }
      return false;
    },
    onUploadPhoto(image) {
      console.log(image);
      if (image) {
        this.contato.foto = image;
      } else {
        console.log('FileReader API not supported: use the <form>!');
      }
    },
  },
  computed: {
    tipoPessoaFisica() {
      return this.contato.tipo_pessoa === 'F';
    },
    labelTipoDocumento() {
      return this.tipoPessoaFisica ? 'CPF' : 'CNPJ';
    },
    editando() {
      return !!this.$route.params.id;
    },
  },
  mounted() {
    /* foca no primeiro input assim que inicia */
    this.$refs.documentoValor.$el.querySelector('input').focus();
  },
  validations: {
    contato: {
      tipo_pessoa: {
        required,
      },
      nome: {
        required,
      },
      razao_social: {
        required: requiredIf((vm) => vm.tipo_pessoa !== 'F'),
      },
      documento_valor: {
        required,
        minLength: function minLength(value) {
          const length = this.tipoPessoaFisica ? 11 : 14;
          return !!value && value.length >= length;
        },
        maxLength: function maxLength(value) {
          const length = this.tipoPessoaFisica ? 11 : 14;
          return !!value && value.length <= length;
        },
      },
      sexo: {
        required: requiredIf((vm) => vm.tipo_pessoa === 'F'),
      },
      data_nascimento: {
        required: requiredIf((vm) => vm.tipo_pessoa === 'F'),
      },
      enderecos: {
        required,
      },
    },
  },
};
</script>

<style>

</style>

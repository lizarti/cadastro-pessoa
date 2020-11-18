<template>
  <div>
    <t-form-group :label="item.label">

      <component
        :is="resolvedComponentForItem"
        ref="inputRef"
        v-bind="resolvedAttributesForItem"
        v-model="model[$vnode.key]"
        >
      </component>

      <template v-slot:errors v-if="hasAnyError">
        <div class="flex flex-col">
          <template v-for="(rule, index) in rulesForItem">
            <span :key="index" v-if="!rule.valid"> {{ rule.message }}</span>
          </template>
        </div>
      </template>

    </t-form-group>
  </div>
</template>

<script>
import TTextField from '@/components/base/TTextField/TTextField.vue';
import TSelect from '@/components/base/TSelect/TSelect.vue';

export default {
  name: 't-form-item',
  props: {
    model: null,
    item: {
      type: Object,
      required: true,
      default() {
        return {
          type: null,
          label: '',
        };
      },
    },
  },
  computed: {
    resolvedComponentForItem() {
      const componentsMap = {
        text: TTextField.name,
        date: TTextField.name,
        select: TSelect,
      };
      return componentsMap[this.item.type];
    },
    resolvedAttributesForItem() {
      const common = {
        prependIcon: this.item.prependIcon,
        prependHandler: this.item.prependHandler,
        appendIcon: this.item.appendIcon,
        appendHandler: this.item.appendHandler,
      };

      const componentsMap = {
        date: {
          type: 'date',
        },
        select: {
          options: this.item.options,
          title: this.item.optionText,
        },
      };
      return {
        ...common,
        ...componentsMap[this.item.type],
      };
    },
    rulesForItem() {
      const { rules } = this.item;
      if (typeof rules !== 'object') {
        return null;
      }
      const passes = {};
      if (rules.required) {
        passes.required = {
          valid: this.computedValue !== undefined && this.computedValue !== null && this.computedValue.toString().trim() !== '',
          message: 'O campo é obrigatório',
        };
      }
      if (rules.minLength) {
        passes.minLength = {
          valid: this.computedValue.toString().length >= rules.minLength,
          message: `O campo precisa ter pelo menos ${rules.minLength} caracteres.`,
        };
      }
      if (rules.maxLength) {
        passes.maxLength = {
          valid: this.computedValue.toString().length <= rules.maxLength,
          message: `O campo precisa ter no máximo ${rules.maxLength} caracteres`,
        };
      }
      return passes;
    },
    hasAnyError() {
      return true;
    },
    computedValue() {
      return this.model[this.$vnode.key];
    },
  },
};
</script>

<style>

</style>

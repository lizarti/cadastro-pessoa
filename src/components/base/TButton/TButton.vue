<template>
  <button
    v-on="clickListeners"
    type="button"
    class="inline-flex justify-center items-center rounded-md px-4 py-2
    text-sm leading-5 font-medium transition ease-in-out duration-200"
    :class="{ ...computedTypes, ...computedColors }">
    <template v-if="$slots.prepend">
      <div class="leading-4" v-if="!!$slots.prepend" :class="{'mr-1':!icon}">
        <slot name="prepend"></slot>
      </div>
    </template>
    <div class="inline-flex justify-between items-center">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 't-button',
  props: {
    color: {
      type: String,
      required: false,
    },
    primary: Boolean,
    disabled: Boolean,
    icon: Boolean,
    text: Boolean,
  },
  data: () => ({
    defaultType: {
      rounded: true,
      'rounded-lg': false,
      'py-2': true,
      'px-4': true,
      border: true,
      'hover:bg-gray-100': true,
      'border-gray-300': true,
      shadow: true,
    },
  }),
  computed: {
    computedTypes() {
      const type = { ...this.defaultType };
      if (this.icon) {
        type.border = false;
        type['py-2'] = false;
        type['px-4'] = false;
        type['hover:bg-gray-100'] = false;
        type['rounded-lg'] = true;
      }
      if (this.text) {
        type.border = false;
        type['border-gray-300'] = false;
        type.shadow = false;
        type.transparent = true;
      }
      if (this.color) {
        type.border = false;
        type['hover:bg-gray-100'] = false;
        type['border-gray-300'] = false;
        type['bg-transparent'] = true;
      }
      return type;
    },
    computedColors() {
      let { color } = this;
      if (!color) {
        if (this.text) {
          color = 'white';
        } else {
          return null;
        }
      }
      let textColor = this.text ? `${color}-500` : `${color}-100`;
      let textHoverColor = this.text ? `${color}-800` : 'white';
      let bgColor = `${color}-500`;
      let bgHoverColor = `${color}-400`;
      if (color === 'white') {
        textColor = 'gray-800';
        textHoverColor = 'black';
        bgColor = 'white';
        bgHoverColor = 'gray-100';
      } else if (color === 'black') {
        textColor = 'gray-100';
        textHoverColor = 'gray-200';
        bgColor = 'black';
        bgHoverColor = 'gray-800';
      }

      return {
        [`text-${textColor}`]: !!this.color,
        [`hover:text-${textHoverColor}`]: !!this.color,
        [`bg-${bgColor}`]: !!this.color && !this.text,
        [`hover:bg-${bgHoverColor}`]: !!this.color && !this.text,
        'opacity-50 cursor-not-allowed': this.disabled,
      };
    },
    clickListeners() {
      return {
        ...this.$listeners,
        click: (event) => {
          if (!this.disabled) {
            this.$emit('click', event);
          }
        },
      };
    },
  },
};
</script>

<style>

</style>

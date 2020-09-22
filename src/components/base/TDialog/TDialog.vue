<template>
  <div class="fixed z-50 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4
      px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <div
        class="inline-block align-bottom bg-white rounded text-left
        overflow-hidden shadow-xl transform transition-all sm:my-8
        sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  {{ content }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span
          class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto"
          v-if="okButtonColor">
            <t-button :color="okButtonColor" @click="$emit('ok')">{{ okButton }}</t-button>
          </span>
          <span
            class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            v-if="cancelButton">
            <t-button text @click="$emit('cancel')">{{ cancelButton }}</t-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 't-dialog',
  props: {
    title: String,
    content: String,
    okButton: {
      type: String,
      required: false,
      default() {
        return 'OK';
      },
    },
    cancelButton: {
      type: String,
      required: false,
      default() {
        return 'Cancelar';
      },
    },
    okButtonColor: {
      type: String,
      required: false,
      default() {
        return 'blue';
      },
    },
  },
};
</script>

<style>
</style>

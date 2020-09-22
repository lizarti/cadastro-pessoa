<template>
  <div class="sticky top-0">
    <div class="z-50 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between">

        <div class="px-4 py-4 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-800">
            {{ pageTitle }}
          </h3>
        </div>
        <div class="flex justify-end items-center border-b-2 text-gray-600 border-gray-100 py-4">
          <nav class="flex space-x-4 items-center">
            <TNavbarItem>
              <img class="h-8 w-8 rounded-full" src="https://api.adorable.io/avatars/128/banana.png" alt="" />
            </TNavbarItem>
          </nav>
          <div class="ml-4 -mr-2 md:hidden">
            <TNavbarItem icon @click="opened = !opened">
              <t-icon type="menu"></t-icon>
            </TNavbarItem>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      v-show="opened">
      <div class="rounded-md shadow-lg">
        <div class="rounded-md shadow-xs bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <img class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                  alt="Workflow">
              </div>
              <div class="-mr-2">
                <button
                  type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400
                  hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                  focus:text-gray-500 transition duration-150 ease-in-out"
                  @click="opened = false">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <nav class="grid row-gap-4">
                <template v-for="item in menuItems">
                  <template v-if="item.section">
                    <span
                      class="flex font-medium text-sm text-gray-400 px-4 my-2 uppercase"
                      :key="item.label">{{ item.label }}
                    </span>
                  </template>
                  <template v-if="!item.section">
                    <router-link exact :to="{ name: item.action }" :key="item.label">
                      <a
                        href="#"
                        class="-m-2 p-2 flex items-center space-x-2 rounded-md hover:bg-gray-100
                        transition ease-in-out duration-150">
                        <div class="text-base leading-6 font-medium text-gray-800">
                          {{ item.label }}
                        </div>
                      </a>
                    </router-link>
                  </template>
                </template>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TNavbarItem from './TNavbarItem.vue';

export default {
  name: 't-navbar',
  components: {
    TNavbarItem,
  },
  data: () => ({
    opened: false,
  }),
  computed: {
    menuItems() {
      return this.$store.getters['base/menuItems'];
    },
    pageTitle() {
      return this.$store.getters['base/pageTitle'];
    },
  },
};
</script>

<style>

</style>

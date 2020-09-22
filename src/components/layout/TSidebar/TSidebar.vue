<template>
  <div class="min-h-screen md:flex md:flex-col bg-gray-100 px-4 py-4 w-64 hidden">
    <div class="flex items-center justify-center">
        <img class="h-8" src="https://vuejs.org/images/logo.png">
    </div>
    <div class="flex w-full mt-10">
      <ul class="flex flex-col w-full">
        <TSidebarItem v-for="item in menuItems" :item="item" :key="item.name"></TSidebarItem>
      </ul>
    </div>
  </div>
</template>

<script>
import TSidebarItem from './TSidebarItem.vue';

export default {
  name: 't-sidebar',
  components: {
    TSidebarItem,
  },
  data: () => ({
    opened: false,
  }),
  computed: {
    menuItems() {
      return this.$store.getters['base/menuItems'];
    },
  },
};
</script>

<style>
</style>

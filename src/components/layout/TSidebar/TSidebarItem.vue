<template>
  <li class="my-px">
    <template v-if ="item.section">
      <span
        class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">{{ item.label }}</span>
    </template>
    <template v-if="!item.section">
      <router-link
        exact
        :to="{ name: item.action }"
        class="flex flex-row items-center h-10 px-4 rounded-md text-gray-600 hover:bg-gray-200">
        <span class="flex items-center justify-center text-lg text-gray-500">
          <t-icon :type="item.icon" v-if="item.icon"></t-icon>
        </span>
        <span class="ml-3">{{ item.label }}</span>
      </router-link>
      <div v-show="item.opened" class="bg-gray-100" v-if="item.children">
        <a
          v-for="child in item.children"
          :key="child.name"
          class="py-2 px-16 block text-sm text-gray-600 hover:bg-blue-500 hover:text-white">
          {{ child.label }}
        </a>
      </div>
    </template>
  </li>
</template>

<script>
export default {
  name: 't-sidebar-item',
  props: {
    item: {
      required: true,
    },
  },
};
</script>

<style>

</style>

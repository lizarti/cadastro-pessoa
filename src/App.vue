<template>
  <div class="text-gray-900 antialiased min-h-screen flex bg-gray-100">
    <t-sidebar></t-sidebar>
    <div class="w-full flex flex-col">
      <t-navbar></t-navbar>
      <div class="p-2 wrapper">
        <router-view></router-view>
      </div>
    </div>
    <t-notification></t-notification>
  </div>
</template>

<style lang="scss">
  .wrapper {
    overflow-y: auto;
    max-height: calc(100vh - 66px);
    height: 100%;
  }
</style>

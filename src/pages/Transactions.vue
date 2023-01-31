<script setup>
import Sidebar from '../components/Sidebar.vue';
import Products from '../components/Products.vue'
</script>

<template>
  <div class="flex flex-col lg:flex-row">
    <Products class="content-area px-4 lg:w-full lg:px-32"/>
    <Sidebar class="content-area lg:w-2/5 px-4 justify-end bg-slate-200" />
  </div>
  
</template>
<style scoped>
  .content-area {
    height: calc(100vh - theme('spacing.12'));
  }
</style>
<script setup>
  import { useRoute, RouterView } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();
  const showHeader = computed(() => route.meta.showHeader);
</script>

<template>
  <div class="h-screen flex flex-col justify-between bg-theme-dark">
    <site-header v-if="showHeader" bgColor="bg-theme-dark" />
    <main class="grow">
      <div class="container mx-auto py-6">
        <RouterView />
      </div>
    </main>
    <site-footer bgColor="bg-theme-dark" />
  </div>
</template>

<style scoped>
</style>

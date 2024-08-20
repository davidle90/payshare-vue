<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen flex flex-col justify-between bg-gray-50">
    <site-header />
    <main class="grow">
      <div class="container mx-auto py-6">
        <RouterView />
      </div>
    </main>
    <site-footer />
  </div>
</template>

<style scoped>
</style>

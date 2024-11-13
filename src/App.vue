<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
#app {
  height: 100vh;
}
.no-scroll {
  overflow: hidden;
}
</style>


<script setup>
import HomeView from './views/HomeView.vue'
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/tasks">Tarefas</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  nav {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .router-link-active {
    font-weight: bold;
    color: #42b883;
  }
</style>



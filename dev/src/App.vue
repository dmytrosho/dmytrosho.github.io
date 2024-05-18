<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="flex">
    <router-link to="/" class="h1">dmytro sholka<i>:</i></router-link>
    <dropper
      :selectedOption="selectedOption"
      :options="navLinks"
      @update:selectedOption="handleSelectedOptionUpdate"
    />
  </nav>
  <RouterView />
</template>

<script>
import dropper from './components/dropper/DropperNav.vue'
export default {
  data() {
    return {
      navLinks: [
        { value: '/', label: 'Portfolio' },
        { value: '/about', label: 'About' },
        { value: '/contact', label: 'Contact' }
      ],
      selectedOption: null
    }
  },
  methods: {
    handleSelectedOptionUpdate(option) {
      this.selectedOption = option
    }
  },
  components: { dropper }
}
</script>

<style scoped lang="scss">
nav {
  position: relative;
  padding: 0 1rem;
  background-color: rgba(0, 0, 0, 0.05);

  .h1 {
    gap: 0;
    color: burlywood;
    font-size: 3rem;
    text-transform: capitalize;
    opacity: 0.75;

    i {
      font-style: normal;
      animation: flicker 0.46s infinite alternate;
    }
  }
}

@media screen and (max-width: 768px) {
  nav {
    padding: 1rem;

    .h1 {
      font-size: 1.5rem;
    }
  }
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
</style>

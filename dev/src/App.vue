<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="flex">
    <h1>dmytro sholka<i>:</i></h1>
    <dropper
      :selectedOption="selectedOption"
      :options="navLinks"
      @update:selectedOption="handleSelectedOptionUpdate"
    />
  </header>
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
header {
  position: relative;
  padding: 0 1rem;

  h1 {
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

@keyframes flicker {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
</style>

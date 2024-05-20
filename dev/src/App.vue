<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="flex">
    <h1 class="flex flex-col">
      <!-- <sup class="flex">Hello, I'm</sup> -->
      <router-link to="/">dmytro sholka<i>:</i></router-link>
      <!-- <sub class="flex flex-end">and this is my</sub> -->
    </h1>
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
        { value: '/', label: 'Portfolio', sub: 'and this is my' },
        { value: '/about', label: 'About', sub: '' },
        { value: '/contact', label: 'Contact', sub: '' }
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

  h1 {
    gap: 0;
    font-size: 3rem;
    text-transform: capitalize;
    opacity: 0.75;

    a {
      gap: 0;
      color: burlywood;
    }

    i {
      font-style: normal;
      animation: flicker 0.46s infinite alternate;
    }

    sup,
    sub {
      font-size: 1rem;
    }

    sup {
      margin-left: 0.25rem;
      margin-bottom: -1.75rem;
    }

    sub {
      margin-top: -1.75rem;
      margin-right: 1.25rem;
    }
  }
}

@media screen and (max-width: 768px) {
  nav {
    padding: .5rem 1rem;

    h1 {
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

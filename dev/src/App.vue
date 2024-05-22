<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="flex align-center">
    <h1 class="flex flex-col">
      <router-link to="/">dmytro sholka<i>:</i></router-link>
    </h1>
    <dropper
      :selectedOption="selectedOption"
      :options="navLinks"
      @update:selectedOption="handleSelectedOptionUpdate"
    />
    <switcher />
  </nav>
  <RouterView />
</template>

<script>
import dropper from './components/dropper/DropperNav.vue'
import switcher from './components/switcher/ThemeSwitcher.vue'
export default {
  components: { dropper, switcher },
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
  }
}
</script>

<style scoped lang="scss">
nav {
  gap: 0.5rem;
  position: relative;
  padding: 0 1rem;
  background-color: #e8e6e2;

  h1 {
    gap: 0;
    font-size: 3rem;
    font-weight: normal;
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
    gap: 0;
    padding: 0.5rem 0.75rem;

    h1 {
      font-size: 1.5rem;
      white-space: nowrap;
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

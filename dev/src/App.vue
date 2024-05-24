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
  <footer>dmytrosho &copy; {{ currentYear }}</footer>
</template>

<script>
import dropper from './components/dropper/DropperNav.vue'
import switcher from './components/switcher/ThemeSwitcher.vue'
export default {
  components: { dropper, switcher },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
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
  background-color: var(--ds-green);

  h1 {
    gap: 0;
    font-size: 3rem;
    font-weight: normal;
    text-transform: capitalize;

    a {
      gap: 0;
      color: var(--ds-text);
      transition: all 0.3s ease-in-out;
      opacity: 0.75;

      &:hover {
        opacity: 1;
      }
    }

    i {
      font-style: normal;
      animation: flicker 1s linear infinite;
    }
  }
}

footer {
  display: flex;
  padding: 0 1rem 1.25rem;
  color: rgba(0, 0, 0, 0.25);
  font-size: 1rem;
  font-weight: 100;
  line-height: 1.75rem;
}

[data-theme='dark'] {
  nav {
    background-color: var(--ds-dark-header);
  }

  footer {
    color: var(--ds-text);
    opacity: 0.1;
  }
}

@media screen and (max-width: 768px) {
  nav {
    gap: 0;
    width: 100%;
    position: fixed;
    padding: 0.5rem 0.75rem;
    z-index: 10;

    h1 {
      font-size: 1.5rem;
      white-space: nowrap;
    }
  }

  footer {
    padding: 0 1rem 1rem;
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

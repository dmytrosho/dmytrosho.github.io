<template>
  <div class="theme flex flex-center">
    <button @click="toggleTheme">
      <template v-if="isDarkTheme"><font-awesome-icon :icon="['fas', 'sun']" /></template>
      <template v-else><font-awesome-icon :icon="['fas', 'moon']" /></template>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkTheme: false
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark'
      document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light')
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme
      document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light')
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light')
    }
  }
}
</script>

<style lang="scss" scoped>
.theme {
  flex: 0 0 3rem;

  button {
    padding: 0;
    border: none;
    background: none;
    color: burlywood;
    font-size: 1.25rem;
    opacity: 0.5;
    appearance: none;
    cursor: pointer;
    transition: all 1s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 768px) {
  .theme {
    flex: 0 0 2rem;

    button {
      font-size: 1rem;
    }
  }
}
</style>

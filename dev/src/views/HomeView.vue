<script setup>
import HomePage from '../components/HomePage.vue'
</script>

<template>
  <section class="flex flex-all">
    <HomePage />
  </section>
</template>

<script></script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  section {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    overflow: auto;
  }
}

@media screen and (min-width: 1800px) {
  section {
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
  }
}
</style>

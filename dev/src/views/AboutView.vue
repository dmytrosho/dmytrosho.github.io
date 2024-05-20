<script setup>
import AboutPage from '../components/AboutPage.vue'
</script>

<template>
  <section class="flex flex-all">
    <AboutPage />
  </section>
</template>

<script></script>

<style lang="scss" scoped>
section {
  gap: 2rem;
  padding: 2rem;
  overflow: auto;
}
@media screen and (max-width: 768px) {
  section {
    flex-direction: column;
  }
}
</style>

<script setup>
import ContactPage from '../components/ContactPage.vue'
</script>

<template>
  <section class="flex flex-all">
    <div class="image flex flex-all"></div>
    <ContactPage />
  </section>
</template>

<script></script>

<style lang="scss" scoped>
section {
  gap: 2rem;
  padding: 2rem;
  overflow: auto;

  .image {
    border-radius: 1rem;
    // background-image: url('../assets/images/profile.png');
    background-repeat: no-repeat;
    // background-position: center;
    background-size: cover;
  }
}
@media screen and (max-width: 768px) {
  section {
    flex-direction: column;
  }
}
</style>

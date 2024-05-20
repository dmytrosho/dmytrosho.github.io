<template>
  <SitePreview url="http://dmytrosho.github.io/resume" text="Resume" />
  <SitePreview url="http://dmytrosho.github.io/skyfitness" text="SkyFitness" />
  <SitePreview url="" text="Loading..." />
  <SitePreview url="" text="Loading..." />
</template>

<script>
import SitePreview from '../components/SitePreview.vue'
export default {
  components: { SitePreview }
}
</script>

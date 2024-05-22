<template>
  <SitePreview url="http://dmytrosho.github.io/resume" text="Resume" :local="resume_local" />
  <SitePreview url="http://dmytrosho.github.io/skyfitness" text="SkyFitness" :local="skyfitness_local" />
  <SitePreview url="" text="Coming soon..." />
  <SitePreview url="" text="Coming soon..." />
</template>

<script>
import SitePreview from '../components/SitePreview.vue'
import resume_local from '@/assets/images/dmytrosho_github_io_resume.png'
import skyfitness_local from '@/assets/images/dmytrosho_github_io_skyfitness.png'

export default {
  components: { SitePreview },
  data() {
    return {
      resume_local,
      skyfitness_local
    }
  }
}
</script>

<template>
  <div class="link flex">
    <a :href="url" class="link-with-preview" :style="{ backgroundImage: 'url(' + image + ')' }">
      <template v-if="loading"><font-awesome-icon :icon="['fas', 'spinner']" /></template>
      <template v-else><span>{{ text }}</span></template>
    </a>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      image: '',
      loading: false
    }
  },
  props: {
    url: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.fetchScreenshot()
  },
  methods: {
    async fetchScreenshot() {
      if (!this.url) {
        console.error("No valid URL!")
        return
      }

      this.loading = true
      const token = 'AJ4M0M4-R5XM1BX-NXNRFMV-N8HRSEJ'
      const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
      const width = '390'
      const height = '844'
      let query = 'https://shot.screenshotapi.net/screenshot'
      query += `?token=${token}&url=${encodeURIComponent(this.url)}&width=${width}&height=${height}&user_agent=${encodeURIComponent(userAgent)}&full_page=true`

      try {
        const response = await axios.get(query)
        this.image = response.data.screenshot
      } catch (error) {
        console.error('Error fetching screenshot:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div class="link flex">
    <a :href="url" class="link-with-preview" :style="{ backgroundImage: 'url(' + image + ')' }">
      <template v-if="loading">
        <font-awesome-icon :icon="['fas', 'spinner']" />
      </template>
      <template v-else>
        <span>{{ text }}</span>
      </template>
    </a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      image: null,
      loading: false
    }
  },
  props: {
    url: {
      type: String,
      required: true
    },
    local: {
      type: String,
      reguired: false
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
        console.log('No valid URL')
        return
      }

      this.loading = true
      const token = import.meta.env.VITE_SCREENSHOT_KEY
      const userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
      const width = '390'
      const height = '844'
      const fresh = false
      let query = 'https://shot.screenshotapi.net/screenshot'
      query += `?token=${token}&url=${encodeURIComponent(this.url)}&fresh=${fresh}&width=${width}&height=${height}&user_agent=${encodeURIComponent(userAgent)}&full_page=true`

      try {
        const response = await axios.get(query)
        if (response.data.error) {
          console.log(response.data.error)
          this.image = this.local
        } else {
          this.image = response.data.screenshot
        }
      } catch (error) {
        console.error('Error fetching screenshot:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  a {
    min-width: 390px;
    gap: 0;
    position: relative;
    border-radius: 1rem;
    border-bottom-left-radius: 0;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-color: white;
    color: var(--ds-accent);
    font-size: 2rem;
    outline: 10px solid white;
    transition: all 1s ease-in-out;
    overflow: hidden;

    &::after {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 1rem;
      border-bottom-left-radius: 0;
      background-color: rgba(0, 0, 0, 0.05);
      transition: all 1s ease-in-out;
      opacity: 1;
      z-index: 0;
      content: '';
    }

    span {
      display: flex;
      align-self: flex-end;
      margin-bottom: -0.25rem;
      padding: 0 1.5rem 0 0.75rem;
      border-top-right-radius: 1rem;
      background-color: white;
      z-index: 1;
    }

    svg {
      width: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1rem;
      margin-left: -1rem;
      animation: rotate 0.75s linear infinite;
    }

    &:hover {
      box-shadow: 0 0 3rem rgba(0, 0, 0, 0.15);

      &::after {
        opacity: 0;
      }
    }
  }
}

[data-theme='dark'] {
  .link {
    a {
      background-color: var(--ds-bakground);
      color: var(--ds-text);
      outline-color: var(--ds-dark-header);

      span {
        background-color: var(--ds-dark-header);
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 768px) {
  .link {
    flex: 1 0 0%;

    a {
      flex: 1 0 0%;
      min-width: 0;
      min-height: 300px;
      font-size: 1.5rem;
    }
  }
}
</style>

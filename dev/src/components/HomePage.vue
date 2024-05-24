<template>
  <template v-if="isMobile || isUltraWide">
    <SitePreview url="http://dmytrosho.github.io/resume" text="Resume" :local="resume_local" />
    <SitePreview
      url="http://dmytrosho.github.io/skyfitness"
      text="SkyFitness"
      :local="skyfitness_local"
    />
    <SitePreview url="" text="Coming soon..." />
    <SitePreview url="" text="Coming soon..." />
    <SitePreview url="" text="Coming soon..." />
  </template>
  <template v-else>
    <swiper
      :slidesPerView="3.5"
      :spaceBetween="0"
      :freeMode="true"
      :breakpoints="{
        '768': {
          slidesPerView: 1.5
        },
        '800': {
          slidesPerView: 1.75
        },
        '900': {
          slidesPerView: 2
        },
        '1024': {
          slidesPerView: 2.25
        },
        '1100': {
          slidesPerView: 2.5
        },
        '1200': {
          slidesPerView: 2.75
        },
        '1300': {
          slidesPerView: 3
        },
        '1400': {
          slidesPerView: 3.25
        },
        '1500': {
          slidesPerView: 3.5
        },
        '1600': {
          slidesPerView: 3.75
        }
      }"
      :modules="modules"
      class="portfolio"
    >
      <swiper-slide
        ><SitePreview url="http://dmytrosho.github.io/resume" text="Resume" :local="resume_local"
      /></swiper-slide>
      <swiper-slide
        ><SitePreview
          url="http://dmytrosho.github.io/skyfitness"
          text="SkyFitness"
          :local="skyfitness_local"
      /></swiper-slide>
      <swiper-slide><SitePreview url="" text="Coming soon..." /></swiper-slide>
      <swiper-slide><SitePreview url="" text="Coming soon..." /></swiper-slide>
      <swiper-slide><SitePreview url="" text="Coming soon..." /></swiper-slide>
    </swiper>
    <!-- <button ref="prevBtn" class="swiper-button-prev"></button> -->
    <!-- <button ref="nextBtn" class="swiper-button-next"></button> -->
  </template>
</template>

<script>
import SitePreview from './preview/SitePreview.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import resume_local from '@/assets/images/dmytrosho_github_io_resume.png'
import skyfitness_local from '@/assets/images/dmytrosho_github_io_skyfitness.png'

export default {
  components: { SitePreview, Swiper, SwiperSlide },
  data() {
    return {
      resume_local,
      skyfitness_local,
      isMobile: false,
      isUltraWide: false,
      // prevBtn: null,
      // nextBtn: null
    }
  },
  mounted() {
    // this.prevBtn = this.$refs.prevBtn
    // this.nextBtn = this.$refs.nextBtn
    this.checkSize()
    window.addEventListener('resize', this.checkSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkSize)
  },
  computed: {
    modules() {
      return [FreeMode, Navigation]
    }
  },
  methods: {
    checkSize() {
      this.isMobile = window.matchMedia('(max-width: 768px)').matches
      this.isUltraWide = window.matchMedia('(min-width: 1800px)').matches
    }
  }
}
</script>

<style lang="scss">
.swiper {
  padding: 2rem;

  .swiper-slide {
    display: flex;
  }
}

.swiper-button-prev,
.swiper-button-next {
  width: 2rem;
  height: 2rem;
  top: auto;
  bottom: 1.25rem;
  border: none;
  border-radius: 100%;
  background-color: white;

  &::after {
    color: var(--ds-accent);
    font-size: 1rem;
    font-weight: bold;
  }
}

.swiper-button-prev {
  left: auto;
  right: 4.5rem;

  &::after {
    padding-right: 2px;
  }
}
.swiper-button-next {
  right: 2rem;

  &::after {
    padding-left: 2px;
  }
}

[data-theme='dark'] {
  .swiper-button-prev,
  .swiper-button-next {
    background-color: var(--ds-dark-header);

    &::after {
      color: var(--ds-text);
    }
  }
}
</style>

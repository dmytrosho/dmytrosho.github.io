<template>
  <template v-if="isMobile">
    <SitePreview url="http://dmytrosho.github.io/resume" text="Resume" :local="resume_local" />
    <SitePreview
      url="http://dmytrosho.github.io/skyfitness"
      text="SkyFitness"
      :local="skyfitness_local"
    />
    <SitePreview url="" text="Coming soon..." />
    <SitePreview url="" text="Coming soon..." />
  </template>
  <template v-else>
    <swiper
      :slidesPerView="3.5"
      :spaceBetween="0"
      :navigation="true"
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
        '1600': {
          slidesPerView: 3.5
        },
        '1800': {
          slidesPerView: 4
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
    </swiper>
  </template>
</template>

<script>
import SitePreview from '../components/SitePreview.vue'
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
      isMobile: false
    }
  },
  mounted() {
    this.checkIsMobile()
    window.addEventListener('resize', this.checkIsMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkIsMobile)
  },
  computed: {
    modules() {
      return [FreeMode, Navigation]
    }
  },
  methods: {
    checkIsMobile() {
      this.isMobile = window.matchMedia('(max-width: 768px)').matches
      if (this.isMobile) {
        this.swiperDirection = 'horizontal'
      } else {
        this.swiperDirection = 'vertical'
      }
    }
  }
}
</script>

<style lang="scss">
.swiper {
  padding: 2rem 2rem 5rem;

  .swiper-slide {
    display: flex;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 2rem;
    height: 2rem;
    top: auto;
    bottom: 1.25rem;
    border-radius: 100%;
    background-color: white;

    &::after {
      color: burlywood;
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
}
</style>

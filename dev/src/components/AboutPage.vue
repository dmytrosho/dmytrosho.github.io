<template>
    <div class="link flex flex-all">
        <a href="http://dmytrosho.github.io/resume">Resume</a>
    </div>
    <div class="link flex flex-all">
        <a href="http://dmytrosho.github.io/skyfitness">SkyFitness</a>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
export default {
    
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    modules() {
      return [Autoplay, FreeMode, Navigation, Pagination]
    }
  }
}
</script>
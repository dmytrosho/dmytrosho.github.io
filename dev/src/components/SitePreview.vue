<template>
  <div class="link flex">
    <a :href="url" class="link-with-preview" :style="{ backgroundImage: 'url(' + image + ')' }">
      {{ text }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

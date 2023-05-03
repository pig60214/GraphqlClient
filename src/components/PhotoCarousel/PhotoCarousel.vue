<template>
  <div v-if="autoPlay" :id="carouselId" class="carousel slide" data-bs-ride="carousel">
    <PhotoCarouselContent :carouselId="carouselId" />
  </div>
  <div v-else :id="carouselId" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
    <PhotoCarouselContent :carouselId="carouselId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PhotoCarouselContent from '@/components/PhotoCarousel/PhotoCarouselContent.vue';

export default defineComponent({
  name: 'PhotoCarousel',
  props: {
    carouselId: String,
  },
  components: {
    PhotoCarouselContent,
  },
  setup() {
    const autoPlay = ref(false);
    return { autoPlay };
  },
});
</script>

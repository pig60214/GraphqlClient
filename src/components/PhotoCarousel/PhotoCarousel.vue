<template>
  <div v-if="autoPlay" :id="carouselId" class="carousel slide" data-bs-ride="carousel">
    <PhotoCarouselContent :carouselId="carouselId" :photos="photos" />
  </div>
  <div v-else :id="carouselId" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
    <PhotoCarouselContent :carouselId="carouselId" :photos="photos" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import Photo from '@/interface/Photo';
import PhotoCarouselContent from '@/components/PhotoCarousel/PhotoCarouselContent.vue';

export default defineComponent({
  name: 'PhotoCarousel',
  props: {
    carouselId: String,
    photos: Array as ()=> Photo[],
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

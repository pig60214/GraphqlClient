<template>
  <carousel :items-to-show="1" v-model="currentSlide" v-if="photos.length > 0" :autoplay="2000" >
    <slide v-for="photo, index in photos" :key="index">
      <div class="tw-bg-white tw-px-2 tw-pt-2 tw-pb-12">
        <img :alt="photo.caption" :src="photo.path" :style="`max-height: ${height*0.5}px`">
        <h6 class="tw-mt-3">{{ photo.caption }}</h6>
      </div>
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
  <div class="tw-flex tw-space-x-1">
    <div class="tw-h-2 tw-flex-grow"
      v-for="photo, index in photos"
      :key="index" :class="index === currentSlide ? 'tw-bg-black' : 'tw-bg-gray-400'"
      @click="currentSlide = index"
    >
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
} from 'vue';
import { useStore } from '@/store';
import 'vue3-carousel/dist/carousel.css';
import {
  Carousel,
  Slide,
  Navigation,
} from 'vue3-carousel';

export default defineComponent({
  name: 'PhotoCarouselContent',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  setup() {
    const store = useStore();
    const photos = computed(() => store.state.photosInCarousel);
    const currentSlide = ref(0);
    const height = window.innerHeight;

    return {
      photos,
      currentSlide,
      height,
    };
  },
});
</script>

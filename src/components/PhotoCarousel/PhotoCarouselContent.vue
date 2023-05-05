<template>
<div :style="`max-width: ${width}px`" class="tw-px-2">
  <Carousel :items-to-show="1" v-model="currentSlide" v-if="photos.length > 0" :autoplay="2000">
    <Slide v-for="photo, index in photos" :key="index">
      <div class="tw-bg-white tw-px-2 tw-pt-2 tw-pb-12">
        <img :alt="photo.caption" :src="photo.path" :style="`max-height: ${height*0.5}px`">
        <h6 class="tw-mt-3">{{ photo.caption }}</h6>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
  <div class="tw-flex tw-space-x-0.5">
    <div class="tw-h-2 tw-flex-grow"
      v-for="photo, index in photos"
      :key="index" :class="index === currentSlide ? 'tw-bg-black' : 'tw-bg-gray-400'"
      @click="currentSlide = index"
    >
    </div>
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
    const width = window.innerWidth;

    const goSlide = (index: number) => {
      if (index >= 0 && index < photos.value.length) {
        currentSlide.value = index;
      }
    };

    document.onkeydown = (e) => {
      e = e || window.event;
      const arrowLeft = 37;
      const arrowRight = 39;
      if (e.keyCode === arrowLeft) {
        goSlide(currentSlide.value - 1);
      } else if (e.keyCode === arrowRight) {
        goSlide(currentSlide.value + 1);
      }
    };

    return {
      photos,
      currentSlide,
      height,
      width,
    };
  },
});
</script>

<style lang="postcss">
.carousel__prev, .carousel__next {
  @apply tw-rounded-full tw-bg-opacity-60 tw-bg-bg;
}
</style>

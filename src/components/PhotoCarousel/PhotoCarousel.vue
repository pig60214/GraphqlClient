<template>
  <PhotoCarouselContent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PhotoCarouselContent from '@/components/PhotoCarousel/PhotoCarouselContent.vue';

export default defineComponent({
  name: 'PhotoCarousel',
  components: {
    PhotoCarouselContent,
  },
  setup() {
    // remove after adjust done
    return { };
  },
});
</script>

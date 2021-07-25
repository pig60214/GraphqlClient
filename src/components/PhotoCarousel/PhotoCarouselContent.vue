<template>
  <div class="carousel-indicators">
    <button
      type="button"
      :data-bs-target="`#${carouselId}`"
      v-for="photo, index in photos"
      :key="index"
      :data-bs-slide-to="index"
      :class="{ active : index == currentPhotoIndex }"
      @click="currentPhotoIndex = index"
    />
  </div>
  <div class="carousel-inner ">
    <div v-for="photo, index in photos" :key="index" class="carousel-item" :class="{ active : index == currentPhotoIndex }">
      <div class="ratio ratio-1x1">
        <img :alt="photo.caption" :src="photo.path">
      </div>
      <div class="carousel-caption d-md-block">
        <h6>{{ photo.caption }}</h6>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" :data-bs-target="`#${carouselId}`" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" :data-bs-target="`#${carouselId}`" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from 'vue';
import Photo from '@/interface/Photo';

export default defineComponent({
  name: 'PhotoCarouselContent',
  props: {
    carouselId: String,
    photos: Array as ()=> Photo[],
  },
  setup(props) {
    const currentPhotoIndex = ref(0);

    watch(
      () => props.photos,
      () => {
        currentPhotoIndex.value = 0;
      },
    );

    return { currentPhotoIndex };
  },
});
</script>

<style lang="scss" scoped>
img {
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  margin: auto;
  right: 0;
  bottom: 0;
}
</style>

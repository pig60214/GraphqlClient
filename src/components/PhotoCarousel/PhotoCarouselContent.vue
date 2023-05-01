<template>
  <div class="carousel-dark tw-mb-2">
    <div class="tw-flex tw-justify-between" v-if="photos && photos.length > 1">
      <button type="button" style="line-height: 0" :data-bs-target="`#${carouselId}`" data-bs-slide="prev">
        <span class="carousel-control-prev-icon tw-h-5 tw-w-5" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button type="button" style="line-height: 0" :data-bs-target="`#${carouselId}`" data-bs-slide="next">
        <span class="carousel-control-next-icon tw-h-5 tw-w-5" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="carousel-indicators tw-top-0 tw-bottom-auto">
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
  </div>
  <div class="carousel-inner">
    <div v-for="photo, index in photos" :key="index" class="carousel-item tw-max-w-full tw-w-auto" :class="{ active : index == currentPhotoIndex }">
        <div class="tw-bg-white tw-mx-auto tw-px-2 tw-pt-2 tw-pb-12">
          <img :alt="photo.caption" :src="photo.path" class="tw-m-0">
          <div style="color: #4c4c4e" class="font-black">{{ photo.caption }}</div>
        </div>
    </div>
  </div>
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

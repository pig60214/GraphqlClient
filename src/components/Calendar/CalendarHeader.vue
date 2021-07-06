<template>
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" :data-bs-interval="bsInterval">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          v-for="photo, index in photos"
          :key="index"
          :data-bs-slide-to="index"
          :class="{ active : index == currentPhotoIndex }"
          @click="currentPhotoIndex = index"
        />
      </div>
      <div class="carousel-inner ">
        <div v-for="photo, index in photos" :key="index" class="carousel-item" :class="{ active : index == currentPhotoIndex }">
          <div class="ratio ratio-1x1" style="background: lightgray;">
            <img :alt="photo.caption" :src="photo.path">
          </div>
          <div class="carousel-caption d-md-block">
            <h6>{{ photo.caption }}</h6>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CalenderHeader',
  setup() {
    const store = useStore();
    const photos = reactive(computed(() => store.state.currentDate.photos));
    const autoPlay = ref(false);
    const bsInterval = computed(() => (autoPlay.value ? 5000 : false));
    const currentPhotoIndex = ref(0);

    watch(
      () => store.state.currentDate,
      () => {
        currentPhotoIndex.value = 0;
      },
    );

    return { photos, bsInterval, currentPhotoIndex };
  },
});
</script>

<style lang="sass" scoped>
  img
    max-height: 100%
    max-width: 100%
    width: auto
    height: auto
    margin: auto
    right: 0
    bottom: 0
</style>

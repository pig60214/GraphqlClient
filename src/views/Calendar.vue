<template>
  <div id="calendar" class="container rounded-3 shadow" >
    <div class="row justify-content-md-center bg-vue-blue">
      <div class="col-xs-auto col-md-4 align-self-center">
        <PhotoCarousel :photos="photos" :carouselId="'calendarHeader'"/>
      </div>
      <div class="col-xs-auto col-md-8 align-self-center bg-white px-0">
        <calendar-body/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import PhotoCarousel from '../components/PhotoCarousel/PhotoCarousel.vue';
import CalendarBody from '../components/Calendar/CalendarBody.vue';

export default defineComponent({
  name: 'Calender',
  components: {
    PhotoCarousel,
    CalendarBody,
  },
  setup() {
    const store = useStore();
    const photos = computed(() => store.state.currentDate.photos);
    return { photos };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";
</style>

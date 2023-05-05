<template>
  <div id="calendar" class="container">
    <div class="tw-flex tw-flex-col md:tw-flex-row tw-items-center" :style="`height: ${height}px`">
      <div class="md:tw-w-1/4">
        <calendar-body-month/>
        <PhotoCarousel/>
      </div>
      <div class="tw-w-full md:tw-w-3/4 tw-px-4">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import PhotoCarousel from '../components/PhotoCarousel/PhotoCarousel.vue';
import CalendarBodyMonth from '../components/Calendar/CalendarBodyMonth.vue';

export default defineComponent({
  name: 'Calender',
  components: {
    PhotoCarousel,
    CalendarBodyMonth,
  },
  props: {
    dateString: {
      type: String,
      default: () => '',
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();

    const setUpCalendar = () => {
      if (props.dateString !== '') {
        store.commit('setCurrentMonth', props.dateString);
      }
    };

    setUpCalendar();

    watch(
      () => props.dateString,
      () => {
        setUpCalendar();
      },
    );

    watch(
      () => route.name,
      () => {
        store.state.photosInCarousel = [];
      },
    );

    const height = window.innerHeight;

    return { height };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";
</style>

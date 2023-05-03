<template>
  <div id="calendar" class="container" >
    <div class="row tw-items-center tw-h-screen">
      <div class="col-xs-auto col-md-3 tw-p-4">
        <calendar-body-month/>
        <PhotoCarousel :carouselId="'calendarHeader'"/>
      </div>
      <div class="col-xs-auto col-md-9 px-0">
        <div id="calendarBody" class="container">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useStore } from '@/store';
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

    return { };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";
</style>

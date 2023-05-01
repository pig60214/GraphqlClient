<template>
  <div id="calendar" class="container" >
    <div class="row">
      <div class="col-xs-auto col-md-3 tw-self-start tw-p-4">
        <calendar-body-month/>
        <PhotoCarousel :photos="photos" :carouselId="'calendarHeader'"/>
      </div>
      <div class="col-xs-auto col-md-9 px-0 ">
        <div id="calendarBody" class="container tw-p-12">  <!-- TODO: change tw-p-12 to vertical align -->
          <div class="row mb-3">
            <calendar-body-dates />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, watch,
} from 'vue';
import { useStore } from '@/store';
import PhotoCarousel from '../components/PhotoCarousel/PhotoCarousel.vue';
import CalendarBodyDates from '../components/Calendar/CalendarBodyDates.vue';
import CalendarBodyMonth from '../components/Calendar/CalendarBodyMonth.vue';

export default defineComponent({
  name: 'Calender',
  components: {
    PhotoCarousel,
    CalendarBodyDates,
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
    const photos = computed(() => store.state.currentDate.photos);

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

    return { photos };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";
</style>

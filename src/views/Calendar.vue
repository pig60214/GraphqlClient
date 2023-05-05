<template>
  <div id="calendar" class="container">
    <div class="tw-flex tw-flex-col md:tw-flex-row tw-items-center" :style="`height: ${height}px`">
      <div class="md:tw-w-1/4">
        <calendar-body-month/>
        <div class="md:tw-block" :class="{ 'tw-hidden': !showPhotoInMobile }">
          <PhotoCarousel/>
        </div>
      </div>
      <div class="tw-w-full md:tw-w-3/4 tw-p-4 md:tw-block" :class="{ 'tw-hidden': showPhotoInMobile }">
        <router-view/>
      </div>
    </div>
    <button class="tw-inline-block md:tw-hidden
      btn btn-dark tw-rounded-full tw-w-12 tw-h-12 tw-shadow-around
      tw-fixed tw-bottom-2 tw-left-1/2 tw--ml-6" @click="toggle">
      <SvgIcon :svgName="buttonIcon" :className="'tw-w-5 tw-h-5'" />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import useTogglePhoto from '@/composables/useTogglePhoto';
import SvgIcon from '@/components/SvgIcon.vue';
import PhotoCarousel from '../components/PhotoCarousel/PhotoCarousel.vue';
import CalendarBodyMonth from '../components/Calendar/CalendarBodyMonth.vue';

export default defineComponent({
  name: 'Calender',
  components: {
    PhotoCarousel,
    CalendarBodyMonth,
    SvgIcon,
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

    const { showPhotoInMobile, toggle } = useTogglePhoto();
    const buttonIcon = computed(() => {
      if (route.name === 'Calendar') {
        return showPhotoInMobile.value ? 'icon-calendar' : 'icon-photo';
      }
      return showPhotoInMobile.value ? 'icon-list' : 'icon-photo';
    });

    return {
      height,
      showPhotoInMobile,
      toggle,
      buttonIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";
</style>

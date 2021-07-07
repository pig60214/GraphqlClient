<template>
  <div id="calendarBody" class="container">
    <div class="row my-3">
      <calendar-body-month/>
    </div>
    <div class="row mb-3">
      <calendar-body-dates/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalendarBodyDates from './CalendarBodyDates.vue';
import CalendarBodyMonth from './CalendarBodyMonth.vue';

export default defineComponent({
  name: 'CalendarBody',
  components: { CalendarBodyDates, CalendarBodyMonth },
  setup() {
    return {};
  },
});
</script>

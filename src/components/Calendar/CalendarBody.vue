<template>
  <div id="calendarBody" class="container">
    <div class="row my-3">
      <calendar-body-month/>
    </div>
    <div class="row mb-3">
      <calendar-body-date/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalendarBodyDate from './CalendarBodyDate.vue';
import CalendarBodyMonth from './CalendarBodyMonth.vue';

export default defineComponent({
  name: 'CalendarBody',
  components: { CalendarBodyDate, CalendarBodyMonth },
  setup() {
    return {};
  },
});
</script>

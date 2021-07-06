<template>
  <div class="container rounded-3 shadow" >
    <div class="row justify-content-md-center bg-vue-blue">
      <div class="col-xs-auto col-md-4 align-self-center">
        <calendar-header/>
      </div>
      <div class="col-xs-auto col-md-8 align-self-center bg-white">
        <calendar-body/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalendarHeader from '../components/Calendar/CalenderHeaderAutoPlayControl.vue';
import CalendarBody from '../components/Calendar/CalendarBody.vue';

export default defineComponent({
  name: 'Calender',
  components: {
    CalendarHeader,
    CalendarBody,
  },
});
</script>

<style lang="scss" scoped>
.bg-vue-blue {
  background-color: #2c3e50;
}
</style>

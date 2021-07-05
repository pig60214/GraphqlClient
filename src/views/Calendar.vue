<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-sm-auto col-md-4">
            <calendar-header/>
            </div>
            <div class="col-sm-auto col-md-8">
            <calendar-body/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalendarHeader from '../components/Calendar/CalendarHeader.vue';
import CalendarBody from '../components/Calendar/CalendarBody.vue';

export default defineComponent({
  name: 'Calender',
  components: {
    CalendarHeader,
    CalendarBody,
  },
});
</script>

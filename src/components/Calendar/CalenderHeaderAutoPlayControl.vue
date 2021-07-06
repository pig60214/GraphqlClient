<template>
  <div v-if="autoPlay" id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <calendar-header/>
  </div>
  <div v-else id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" :data-bs-interval="false">
    <calendar-header/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CalendarHeader from '@/components/Calendar/CalendarHeader.vue';

export default defineComponent({
  name: 'CalenderHeader',
  components: {
    CalendarHeader,
  },
  setup() {
    const autoPlay = ref(true);
    return { autoPlay };
  },
});
</script>

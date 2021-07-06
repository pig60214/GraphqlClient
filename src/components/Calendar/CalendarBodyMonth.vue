<template>
  <div id="monthCarousel" class="carousel carousel-dark" data-bs-ride="carousel" data-bs-interval="false">
    <div class="carousel-inner ">
      <div v-for="month, index in monthList" :key="index" class="carousel-item" :class="{ active : index == 6 }">
        <h1>{{ month }}</h1>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#monthCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#monthCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
} from 'vue';

export default defineComponent({
  name: 'CalendarBodyMonth',
  setup() {
    const monthList = reactive(['一  月', '二  月', '三  月', '四  月', '五  月', '六  月', '七  月', '八  月', '九  月', '十  月', '十一月', '十二月']);
    return { monthList };
  },
});
</script>

<style lang="scss" scoped>
div.new_html_code {
  width:150px;
  height:100px;
  min-width:150px;
  min-height:100px;
  max-width:200px;
  max-height:100px;
  overflow:hidden;
  display:block;
  border:1px solid red;
}
</style>

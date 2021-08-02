<template>
  <div id="calendarBodyMonth" class="carousel carousel-dark" data-bs-ride="carousel" data-bs-interval="false">
    <div class="carousel-inner">
      <div v-for="month, index in monthList" :key="index" class="carousel-item" :class="{ active : index == currentMonth.month }">
        <h1 class="mb-0 row">
          <div class="col col-2"></div>
          <div class="col col-4 text-end">
            <span v-if="!showMonthSelection" @click="showMonthSelection = true">{{ month }}</span>
            <span v-else>
              <select class="form-select form-select-lg" @change="showMonthSelection = false" v-model="currentMonth.month">
                <option v-for="monthOption, index in monthList" :key="index" :value="index">{{ monthOption }}</option>
              </select>
            </span>
          </div>
          <div class="col col-4 text-start">
            <span v-if="!showYearSelection" @click="showYearSelection = true">{{ currentMonth.year }}</span>
            <span v-else>
              <select class="form-select form-select-lg" @change="showYearSelection = false" v-model="currentMonth.year">
                <option :value="currentMonth.year - 1">{{ currentMonth.year - 1 }}</option>
                <option :value="currentMonth.year">{{ currentMonth.year }}</option>
                <option :value="currentMonth.year + 1">{{ currentMonth.year + 1 }}</option>
              </select>
            </span>
          </div>
          <div class="col col-2"></div>
        </h1>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#calendarBodyMonth" data-bs-slide="prev" @click="currentMonth.addMonth(-1)">
      <span class="carousel-control-prev-icon w-50 h-50" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#calendarBodyMonth" data-bs-slide="next" @click="currentMonth.addMonth(1)">
      <span class="carousel-control-next-icon w-50 h-50" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import {
  computed,
  defineComponent,
  ref,
} from 'vue';

export default defineComponent({
  name: 'CalendarBodyMonth',
  setup() {
    const store = useStore();
    const monthList = ['一 月', '二 月', '三 月', '四 月', '五 月', '六 月', '七 月', '八 月', '九 月', '十 月', '十一月', '十二月'];
    const currentMonth = computed(() => store.state.currentMonth);
    const showYearSelection = ref(false);
    const showMonthSelection = ref(false);

    return {
      monthList,
      currentMonth,
      showYearSelection,
      showMonthSelection,
    };
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

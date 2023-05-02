<template>
  <div id="calendarBodyMonth" class="carousel carousel-dark" data-bs-ride="carousel" data-bs-interval="false">
    <div class="carousel-inner">
      <div v-for="month, index in monthList" :key="index" class="carousel-item" :class="{ active : index == currentMonth.month }">
        <h1 class="mb-0 tw-flex tw-cursor-pointer" @click="goToCalender">
          <div class="tw-w-1/5"></div>
          <div class="tw-w-1/3">
            <div class="tw-relative">
              <span class="tw-leading-none" style="font-size: 16rem">{{ month }}<span class="tw-text-4xl">{{ currentMonth.year }}</span>
              </span>
              <div class="tw-transform tw-absolute" :class="eMonthList[index].place">{{eMonthList[index].value}}</div>
            </div>
            <!-- <span v-if="!showMonthSelection" @click="showMonthSelection = true">{{ month }}</span>
            <span v-else>
              <select class="form-select form-select-lg" @change="showMonthSelection = false" v-model="currentMonth.month">
                <option v-for="monthOption, index in monthList" :key="index" :value="index">{{ monthOption }}</option>
              </select>
            </span> -->
          </div>
        </h1>
      </div>
    </div>
    <div>
      <button class="tw-absolute tw-left-0 tw-top-1/2" type="button" data-bs-target="#calendarBodyMonth" data-bs-slide="prev" @click="goToAddMonth(-1)">
        <span class="carousel-control-prev-icon tw-h-5 tw-w-5" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="tw-absolute tw-right-0 tw-top-1/2" type="button" data-bs-target="#calendarBodyMonth" data-bs-slide="next" @click="goToAddMonth(1)">
        <span class="carousel-control-next-icon tw-h-5 tw-w-5" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import {
  computed,
  defineComponent,
  ref,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dateToString from '@/helpers/dateFormateHelper';

export default defineComponent({
  name: 'CalendarBodyMonth',
  setup() {
    const store = useStore();
    // const monthList = ['一 月', '二 月', '三 月', '四 月', '五 月', '六 月', '七 月', '八 月', '九 月', '十 月', '十一月', '十二月'];
    // const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const eMonthList = [
      { value: 'January', place: 'tw-top-1/2 tw-left-3 tw-rotate-105' },
      { value: 'February', place: 'tw-top-1/2 tw-left-2/3 tw-rotate-0' },
      { value: 'March', place: 'tw-top-20 tw--left-0 tw--rotate-45' },
      { value: 'April', place: 'tw-top-1/2 tw-left-16 tw-rotate-90' },
      { value: 'May', place: 'tw-top-12 tw-left-12 tw--rotate-12' },
      { value: 'June', place: 'tw-bottom-36 tw-left-10 tw--rotate-12' },
      { value: 'July', place: 'tw-top-9 tw-left-11 tw-rotate-40' },
      { value: 'August', place: 'tw-top-20 tw--left-5 tw--rotate-105' },
      { value: 'September', place: 'tw-top-20 tw-left-9 tw-rotate-105' },
      { value: 'ctober', place: 'tw-top-36 tw-left-36 tw-rotate-0' },
      { value: 'November', place: 'tw-top-28 tw-left-8 tw-rotate-90' },
      { value: 'December', place: 'tw-top-1/2 tw-left-32 tw-rotate-0' },
    ];
    // const monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const currentMonth = computed(() => store.state.currentMonth);
    const showYearSelection = ref(false);
    const showMonthSelection = ref(false);

    const router = useRouter();
    const goToAddMonth = (month: number) => {
      const addMonth = currentMonth.value.addMonth(month);
      router.push({ name: 'Calendar', params: { dateString: dateToString(addMonth) } });
    };

    const route = useRoute();
    const goToCalender = () => {
      router.push({ name: 'Calendar', params: { dateString: route.params.dateString } });
    };

    return {
      monthList,
      eMonthList,
      currentMonth,
      showYearSelection,
      showMonthSelection,
      goToAddMonth,
      goToCalender,
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

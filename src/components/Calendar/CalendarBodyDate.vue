<template>
<div class="container" style="padding-right: 0px; padding-left: 0px;">
  <div class="row">
    <div class="col px-0" v-for="day, index in dayList" :key="index" style="width: 14.2857142857%">{{ day }}</div>
  </div>
  <div class="row" v-for="week, index in weekListOfCurrentMonth" :key="index">
      <div class="col px-1" style="width: 14.2857142857%" v-for="dateOfCalendar, indexOfDate in week" :key="indexOfDate" @click="chooseDate(dateOfCalendar)">
        {{dateOfCalendar.isDisable ? '' : dateOfCalendar.date.getDate()}}
        <span class="badge bg-vue-green w-100 badge-text-truncate px-0" v-for="post, index in dateOfCalendar.posts" :key="index">
          {{ post.title }}
        </span>
      </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
} from 'vue';
import DateOfCalendar from '@/class/DateOfCalendar';
import Photo from '@/interface/Photo';
import { useStore } from '@/store';

export default defineComponent({
  name: 'CalendarBodyDate',
  setup() {
    const store = useStore();
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const addEmptyDateOfCalendar = (startDate: Date, dateList: Array<DateOfCalendar>) => {
      if (startDate.getDay() !== 0) {
        let count = startDate.getDay();
        while (count > 0) {
          const nullDateOfCalener = new DateOfCalendar();
          dateList.push(nullDateOfCalener);
          count -= 1;
        }
      }
    };

    const chooseDate = (dateOfCalendar: DateOfCalendar) => {
      store.state.currentDate = dateOfCalendar;
    };

    const dateListOfCurrentMonth = computed(() => {
      const dateList = new Array<DateOfCalendar>();
      const date = new Date(currentYear, currentMonth, 1);

      addEmptyDateOfCalendar(date, dateList);
      let c = 0;
      while (date.getMonth() === currentMonth) {
        const photo1 : Photo = { path: 'https://i.imgur.com/WvF2XFu_d.webp?maxwidth=760&fidelity=grand', caption: date.getDate().toString() };
        const photo2 : Photo = { path: 'https://i.imgur.com/O6usdNx_d.webp?maxwidth=760&fidelity=grand', caption: 'Tree House 2' };

        const dateOfCalendar = new DateOfCalendar();
        dateOfCalendar.date = new Date(date.getTime());
        if (c === 0) {
          dateOfCalendar.posts = [{ title: 'Test1234567', photos: [photo1, photo2] }, { title: 'Test1234567', photos: [photo1, photo2] }];
          c = 1;
        } else {
          dateOfCalendar.posts = [{ title: 'Test1234567', photos: [photo1] }, { title: 'Test1234567', photos: [photo2] }];
          c = 0;
        }

        dateList.push(dateOfCalendar);

        date.setDate(date.getDate() + 1);
      }

      return dateList;
    });
    const weekListOfCurrentMonth = computed(() => {
      const weekList = new Array<Array<DateOfCalendar>>();

      let start = 0;
      while (start < dateListOfCurrentMonth.value.length) {
        weekList.push(dateListOfCurrentMonth.value.slice(start, start + 7));
        start += 7;
      }

      return weekList;
    });
    const dayList = reactive(['日', '一', '二', '三', '四', '五', '六']);

    const todayDateOfCalendar = dateListOfCurrentMonth.value.find((dateOfCalendar) => dateOfCalendar.date?.getDate() === today.getDate());
    store.state.currentDate = todayDateOfCalendar !== undefined ? todayDateOfCalendar : new DateOfCalendar();

    return { dayList, weekListOfCurrentMonth, chooseDate };
  },
});
</script>

<style lang="scss" scoped>
.badge-text-truncate {
  overflow: hidden;
  vertical-align: bottom;
}

.bg-vue-green {
  background-color: #42b983;
}
</style>

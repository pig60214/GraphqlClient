<template>
<div class="container" style="padding-right: 0px; padding-left: 0px;">
  <div class="row">
    <div class="col" v-for="day, index in dayList" :key="index" style="width: 14.2857142857%">{{ day }}</div>
  </div>
  <div class="row" v-for="week, index in weekListOfCurrentMonth" :key="index">
      <div class="col" v-for="dateOfCalendar, indexOfDate in week" :key="indexOfDate" style="width: 14.2857142857%">
        {{dateOfCalendar.isDisable ? '' : dateOfCalendar.date.getDate()}}
        <span class="badge bg-success w-100" v-for="post, index in dateOfCalendar.posts" :key="index">
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
import DateOfCalendar from '@/interface/DateOfCalendar';
import Photo from '@/interface/Photo';

export default defineComponent({
  name: 'CalendarBody',
  setup() {
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

    const dateListOfCurrentMonth = computed(() => {
      const dateList = new Array<DateOfCalendar>();
      const date = new Date(currentYear, currentMonth, 1);

      addEmptyDateOfCalendar(date, dateList);

      while (date.getMonth() === currentMonth) {
        const photo1 : Photo = { path: 'https://i.imgur.com/WvF2XFu_d.webp?maxwidth=760&fidelity=grand', caption: 'Tree House 1' };
        const photo2 : Photo = { path: 'https://i.imgur.com/O6usdNx_d.webp?maxwidth=760&fidelity=grand', caption: 'Tree House 2' };

        const dateOfCalendar = new DateOfCalendar();
        dateOfCalendar.date = new Date(date.getTime());
        dateOfCalendar.posts = [{ title: 'Test123', photos: [photo1, photo2] }, { title: 'Test123', photos:[photo1, photo2] }];

        dateList.push(dateOfCalendar);
        console.log(dateOfCalendar);

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

    return { dayList, weekListOfCurrentMonth };
  },
});
</script>

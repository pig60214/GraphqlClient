<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" v-for="day, index in dayList" :key="index">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="week, index in weekListOfCurrentMonth" :key="index">
        <th v-for="dateOfCalendar, indexOfDate in week" :key="indexOfDate">
          {{dateOfCalendar.isDisable ? '' : dateOfCalendar.date.getDate()}}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
} from 'vue';
import { DateOfCalendar } from '@/interface/DateOfCalendar';

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
          const nullDateOfCalener : DateOfCalendar = { isDisable: true };
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
        const dateOfCalendar : DateOfCalendar = {
          isDisable: false,
          date: new Date(date.getTime()),
        };
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

    return { dayList, weekListOfCurrentMonth };
  },
});
</script>

<template>
<div id="CalendarBodyDates" class="container px-0">
  <div class="row">
    <div class="col px-0 w-1-out-of-7" v-for="day, index in dayList" :key="index">{{ day }}</div>
  </div>
  <div class="row" v-for="week, index in weekListOfCurrentMonth" :key="index">
    <calendar-body-date v-for="dateOfCalendar, indexOfDate in week" :key="indexOfDate" :dateOfCalendar="dateOfCalendar"/>
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
import { useStore } from '@/store';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import useCalendar from '@/composables/useCalendar';
import CalendarBodyDate from './CalendarBodyDate.vue';

export default defineComponent({
  components: { CalendarBodyDate },
  name: 'CalendarBodyDates',
  setup() {
    const store = useStore();
    const { dateListOfCurrentMonth } = useCalendar();

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

    const today = new Date();
    const todayDateOfCalendar = dateListOfCurrentMonth.value.find((dateOfCalendar) => dateOfCalendar.date?.getDate() === today.getDate());
    store.state.currentDate = todayDateOfCalendar !== undefined ? todayDateOfCalendar : new DateOfCalendar();

    const { result: posts } = useQuery(gql`
      query ($postsQueryInput: PostsQueryInput!){
        posts(postsQueryInput: $postsQueryInput){
          id,
          title,
        }
      }
    `, {
      postsQueryInput: {
        from: '2021/06/1',
        to: '2021/06/15',
      },
    });

    return {
      dayList,
      weekListOfCurrentMonth,
    };
  },
});
</script>

<style lang="scss" scoped>
.w-1-out-of-7 {
  width: 14.2857142857%;
}
</style>

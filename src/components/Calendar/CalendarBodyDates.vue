<template>
<div id="CalendarBodyDates" class="container px-0">
  <div class="row">
    <div class="col px-0 w-1-out-of-7" v-for="day, index in dayList" :key="index">{{ day }}</div>
  </div>
  <div class="row" v-for="week, index in weekListOfCurrentMonth" :key="index">
    <calendar-body-date v-for="dateOfCalendar, indexOfDate in week" :key="indexOfDate" :dateOfCalendar="getPosts(dateOfCalendar)"/>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
} from 'vue';
import DateOfCalendar from '@/class/DateOfCalendar';
import { useStore } from '@/store';
import Post from '@/interface/Post';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import CalendarBodyDate from './CalendarBodyDate.vue';

export default defineComponent({
  components: { CalendarBodyDate },
  name: 'CalendarBodyDates',
  setup() {
    const store = useStore();
    const { calendar } = store.state.currentMonth;
    const weekListOfCurrentMonth = ref(calendar);
    const variable = reactive({
      postsQueryInput: {
        from: store.state.currentMonth.firstDateString,
        to: store.state.currentMonth.lastDateString,
      },
    });

    watch(
      () => store.state.currentMonth,
      (newVal, oldVal) => {
        if (newVal.equals(oldVal)) return;
        weekListOfCurrentMonth.value = store.state.currentMonth.calendar;
        variable.postsQueryInput.from = store.state.currentMonth.firstDateString;
        variable.postsQueryInput.to = store.state.currentMonth.lastDateString;
      },
    );

    const { result } = useQuery(gql`
      query ($postsQueryInput: PostsQueryInput!){
        posts(postsQueryInput: $postsQueryInput){
          id,
          title,
          from,
          to,
          color,
          photos {
            path,
            caption
          },
        }
      }
    `, variable,
    {
      fetchPolicy: 'no-cache',
    });
    const posts = useResult(result, [] as Post[], data => data.posts as Post[]);

    const dayList = reactive(['日', '一', '二', '三', '四', '五', '六']);

    const getPosts = (dateOfCalendar: DateOfCalendar) => {
      if (posts.value.length > 0) {
        const { date } = dateOfCalendar;
        if (date) {
          dateOfCalendar.posts = posts.value.filter(post => {
            const from = new Date(post.from);
            const to = new Date(post.to);
            return date.getTime() >= from.getTime() && date.getTime() <= to.getTime();
          });
        }
      }

      return dateOfCalendar;
    };

    return {
      dayList,
      weekListOfCurrentMonth,
      getPosts,
    };
  },
});
</script>

<style lang="scss" scoped>
.w-1-out-of-7 {
  width: 14.2857142857%;
}
</style>

<template>
<div id="CalendarBodyDates" class="container px-0 tw-divide-y tw-divide-black" :class="{ 'tw-animate-pulse': loading }">
  <div class="row tw-divide-x tw-divide-black">
    <div class="col px-0 w-1-out-of-7" v-for="day, index in dayList" :key="index">{{ day }}</div>
  </div>
  <div class="row tw-divide-x tw-divide-black" v-for="week, index in weekListOfCurrentMonth" :key="index">
    <calendar-body-date v-for="dateOfCalendar, indexOfDate in week" :key="indexOfDate" :dateOfCalendar="getPosts(dateOfCalendar)"/>
  </div>
</div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  Ref,
  ref,
  watch,
} from 'vue';
import DateOfCalendar from '@/class/DateOfCalendar';
import { useStore } from '@/store';
import useQueryPostApi from '@/composables/useQueryPostApi';
import PostsQueryInput from '@/interface/graphql/PostsQueryInput';
import CalendarBodyDate from './CalendarBodyDate.vue';

export default defineComponent({
  components: { CalendarBodyDate },
  name: 'CalendarBodyDates',
  setup() {
    const store = useStore();
    const { calendar } = store.state.currentMonth;
    const weekListOfCurrentMonth = ref(calendar);

    watch(
      () => store.state.currentMonth,
      (newVal, oldVal) => {
        if (newVal.equals(oldVal)) return;
        weekListOfCurrentMonth.value = store.state.currentMonth.calendar;
      },
    );

    const dayList = reactive(['日', '一', '二', '三', '四', '五', '六']);

    const variable: Ref<PostsQueryInput> = ref({
      from: store.state.currentMonth.firstDateString,
      to: store.state.currentMonth.lastDateString,
    });

    watch(
      () => store.state.currentMonth,
      (newVal, oldVal) => {
        if (newVal.equals(oldVal)) return;
        variable.value.from = store.state.currentMonth.firstDateString;
        variable.value.to = store.state.currentMonth.lastDateString;
      },
    );

    const { posts: source, loading } = useQueryPostApi(variable);
    const posts = computed(() => loading.value ? [] : source.value);

    const getPosts = computed(() => (dateOfCalendar: DateOfCalendar) => {
      if (posts.value.length > 0) {
        const { date } = dateOfCalendar;
        if (date) {
          dateOfCalendar.posts = posts.value.filter(post => {
            const fromStr = post.from.split('-').map(s => Number(s));
            const toStr = post.to.split('-').map(s => Number(s));
            const from = new Date(fromStr[0], fromStr[1] - 1, fromStr[2]);
            const to = new Date(toStr[0], toStr[1] - 1, toStr[2]);
            return date.getTime() >= from.getTime() && date.getTime() <= to.getTime();
          });
        }
      } else {
        dateOfCalendar.posts = [];
      }

      return dateOfCalendar;
    });

    return {
      dayList,
      weekListOfCurrentMonth,
      getPosts,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.w-1-out-of-7 {
  width: 14.2857142857%;
}
</style>

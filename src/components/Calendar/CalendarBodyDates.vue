<template>
<div class="tw-animate-show">
  <div id="CalendarBodyDates" class="tw-w-full tw-divide-y tw-divide-black" :class="{ 'tw-animate-pulse': loading }">
    <div class="tw-flex tw-divide-x tw-divide-black">
      <div class="px-0 w-1-out-of-7" v-for="day, index in dayList" :key="index">{{ day }}</div>
    </div>
    <div class="tw-flex tw-divide-x tw-divide-black" v-for="week, index in weekListOfCurrentMonth" :key="index">
      <calendar-body-date v-for="dateOfCalendar, indexOfDate in week" :key="indexOfDate" :dateOfCalendar="getPosts(dateOfCalendar)"/>
    </div>
    <div class="tw-block md:tw-hidden">
      <button class=" btn-outline-secondary btn-sm tw-w-1/2" @click="goToAddMonth(-1)">
        <SvgIcon :svgName="'icon-arrow-left'" :className="'tw-w-5 tw-h-5'" />
      </button>
      <button class=" btn-outline-secondary btn-sm tw-w-1/2" @click="goToAddMonth(1)">
        <SvgIcon :svgName="'icon-arrow-right'" :className="'tw-w-5 tw-h-5'" />
      </button>
    </div>
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
import useMonthPanel from '@/composables/useMonthPanel';
import CalendarBodyDate from './CalendarBodyDate.vue';
import SvgIcon from '../SvgIcon.vue';

export default defineComponent({
  components: { CalendarBodyDate, SvgIcon },
  name: 'CalendarBodyDates',
  setup() {
    const store = useStore();
    const weekListOfCurrentMonth = computed(() => store.state.currentMonth.calendar);

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

    const { goToAddMonth } = useMonthPanel();

    return {
      dayList,
      weekListOfCurrentMonth,
      getPosts,
      loading,
      goToAddMonth,
    };
  },
});
</script>

<style lang="scss" scoped>
.w-1-out-of-7 {
  width: 14.2857142857%;
}
</style>

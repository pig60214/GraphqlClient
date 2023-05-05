<template>
  <div id="CalendarBodyDates"
    class="tw-w-full tw-p-2 md:tw-block md:tw-animate-show
    tw-z-10 tw-fixed tw-right-0 tw-bottom-16 md:tw-static" :class="{ 'tw-hidden': !showInMobile, 'tw-animate-pulse': loading }">
    <div class="tw-divide-y tw-divide-black
                tw-bg-white tw-shadow-calendar tw-rounded-md md:tw-bg-transparent md:tw-shadow-none">
      <div class="tw-flex tw-divide-x tw-divide-black">
        <div class="px-0 w-1-out-of-7" v-for="day, index in dayList" :key="index">{{ day }}</div>
      </div>
      <div class="tw-flex tw-divide-x tw-divide-black" v-for="week, index in weekListOfCurrentMonth" :key="index">
        <calendar-body-date v-for="dateOfCalendar, indexOfDate in week" :key="indexOfDate" :dateOfCalendar="getPosts(dateOfCalendar)"/>
      </div>
      <div class="tw-block md:tw-hidden tw-flex tw-justify-end btn-group tw-bg-gray-500 tw-rounded-b-md">
        <button class="btn btn btn-secondary btn-sm" @click="goToAddMonth(-1)">
          <SvgIcon :svgName="'icon-arrow-left'" :className="'tw-w-5 tw-h-5'" />
        </button>
        <button class="btn btn btn-secondary btn-sm" @click="goToAddMonth(1)">
          <SvgIcon :svgName="'icon-arrow-right'" :className="'tw-w-5 tw-h-5'" />
        </button>
      </div>
    </div>
    <div class="tw-block md:tw-hidden triangle"></div>
  </div>
  <button class="tw-inline-block md:tw-hidden
    btn btn-dark tw-rounded-full tw-w-12 tw-h-12
    tw-fixed tw-bottom-2 tw-left-1/2 tw--ml-6" @click="showInMobile = !showInMobile">
    <SvgIcon :svgName="'icon-calendar'" :className="'tw-w-5 tw-h-5'" />
  </button>
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

    const showInMobile = ref(false);
    const toggle = () => { showInMobile.value = !showInMobile.value; };

    const { goToAddMonth } = useMonthPanel();

    return {
      dayList,
      weekListOfCurrentMonth,
      getPosts,
      loading,
      showInMobile,
      toggle,
      goToAddMonth,
    };
  },
});
</script>

<style lang="scss" scoped>
.w-1-out-of-7 {
  width: 14.2857142857%;
}

.triangle::after{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  margin-left: -1.4rem;
  left: 50%;
  bottom: -15px;
  box-sizing: border-box;

  border: 1rem solid black;
  border-color: transparent transparent #6c757d #6c757d;

  transform-origin: 0 0;
  transform: rotate(-45deg);

  box-shadow: -5px 5px 5px 0 rgba(0, 0, 0, 0.1);
}

</style>

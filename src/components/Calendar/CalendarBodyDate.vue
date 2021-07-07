<template>
  <div
    class="col px-1 w-1-out-of-7 mb-1"
    @click="chooseDate"
    :class="{ 'bg-success text-white rounded-3': isChosedDate }"
  >
    <span :class="{ 'fw-bold': isChosedDate }">
      {{ dateOfCalendar.isDisable ? '' : dateOfCalendar.date.getDate() }}
    </span>
    <span
      class="badge w-100 badge-text-truncate px-0"
      v-for="post, index in dateOfCalendar.posts"
      :key="index"
      :class="{ 'bg-vue-green': !isChosedDate }"
    >
      {{ post.title }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import DateOfCalendar from '@/class/DateOfCalendar';

export default defineComponent({
  name: 'CalendarBodyDate',
  props: {
    dateOfCalendar: {
      type: DateOfCalendar,
      default: new DateOfCalendar(),
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const chooseDate = () => {
      store.state.currentDate = props.dateOfCalendar !== undefined ? props.dateOfCalendar : new DateOfCalendar();
    };

    const isChosedDate = computed(() => {
      const currentDate = store.state.currentDate.date?.getDate();
      return !props.dateOfCalendar.isDisable && currentDate === props.dateOfCalendar.date?.getDate();
    });

    return { chooseDate, isChosedDate, ...props };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";

.badge-text-truncate {
  overflow: hidden;
  vertical-align: bottom;
}
</style>

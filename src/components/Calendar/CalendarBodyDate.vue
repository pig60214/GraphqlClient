<template>
  <div
    class="col px-1 w-1-out-of-7 pb-1"
    style="min-height: 5em"
    @click="chooseDate"
    :class="{ 'bg-vue-blue text-white rounded-3': isChosedDate }"
  >
    <span>
      {{ dateOfCalendar.isDisable ? '' : dateOfCalendar.date.getDate() }}
    </span>
    <span
      class="badge w-100 badge-text-truncate px-0 ps-2 text-start bg-gray-blue text-vue-blue"
      v-for="post, index in postsToDisplay"
      :key="index"
    >
      {{ post.title }}
    </span>
    <span
      class="badge w-100 badge-text-truncate px-0 ps-2 text-start"
      v-if="dateOfCalendar.posts && dateOfCalendar.posts.length > 3"
      :class="isChosedDate ? 'bg-vue-blue' : 'bg-white text-vue-blue'"
    >
      ...
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import DateOfCalendar from '@/class/DateOfCalendar';
import { useRouter } from 'vue-router';

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
    const router = useRouter();

    const chooseDate = () => {
      if (props.dateOfCalendar !== undefined && store.state.currentDate.equals(props.dateOfCalendar)) {
        router.push({ name: 'DateDetail', params: { dateString: store.state.currentDate.dateString } });
      }
      if (props.dateOfCalendar !== undefined && !store.state.currentDate.equals(props.dateOfCalendar)) {
        store.state.currentDate = props.dateOfCalendar;
      }
    };

    const isChosedDate = computed(() => {
      const currentDate = store.state.currentDate.date?.getDate();
      return !props.dateOfCalendar.isDisable && currentDate === props.dateOfCalendar.date?.getDate();
    });

    const postsToDisplay = computed(() => {
      const { posts } = props.dateOfCalendar;
      if (posts && posts.length > 3) {
        return posts.slice(0, 2);
      }
      return posts;
    });

    return {
      chooseDate,
      isChosedDate,
      postsToDisplay,
    };
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

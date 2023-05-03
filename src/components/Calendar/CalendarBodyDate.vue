<template>
  <div
    class="col px-1 w-1-out-of-7 pb-1 tw-flex tw-flex-col"
    style="height: 5em"
    @click="chooseDate"
    :class="{ 'bg-font-color': isChosedDate }"
  >
    <span class="tw-leading-tight" :class="{ 'text-white': isChosedDate }">
      {{ dateOfCalendar.isDisable ? '' : dateOfCalendar.date.getDate() }}
    </span>
    <div class="tw-flex tw-flex-col tw-space-y-1">
      <span
        class="my-badge my-animate-show-up"
        v-for="post, index in postsToDisplay"
        :key="index"
        :class="`bg-${post.color}`"
      >
        {{ post.title }}
      </span>
      <span
        class="my-badge"
        v-if="dateOfCalendar.posts && dateOfCalendar.posts.length > 3"
        :class="{ 'text-white': isChosedDate }"
      >
        . . .
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useStore } from '@/store';
import DateOfCalendar from '@/class/DateOfCalendar';
import { useRoute, useRouter } from 'vue-router';

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

    const initCurrentDate = () => {
      const route = useRoute();
      if (route.params.dateString === props.dateOfCalendar.dateString) {
        store.commit('setCurrentDate', props.dateOfCalendar);

        watch(
          () => props.dateOfCalendar,
          () => {
            store.commit('setCurrentDate', props.dateOfCalendar);
          },
          { deep: true },
        );
      }
    };

    initCurrentDate();

    const chooseDate = () => {
      if (props.dateOfCalendar !== undefined) {
        if (store.state.currentDate.equals(props.dateOfCalendar)) {
          router.push({ name: 'DateDetail', params: { dateString: store.state.currentDate.dateString } });
        } else {
          store.commit('setCurrentDate', props.dateOfCalendar);
        }
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

@keyframes my-animate-show-up {
  0% {color: transparent; background: transparent;}
  30% {color: transparent;}
}

.my-animate-show-up {
  animation-name: my-animate-show-up;
  animation-duration: 1s;
}

</style>

<style lang="postcss" scoped>
.my-badge {
  @apply  tw-pl-1 tw-rounded tw-leading-none tw-text-left tw-whitespace-nowrap tw-truncate
}
</style>

<template>
  <div
    class="w-1-out-of-7 tw-flex tw-flex-col tw-h-10 md:tw-h-28 tw-px-0 md:tw-px-1"
    @click="chooseDate"
    :class="{ 'bg-font-color': isChosedDate }"
  >
    <span class="tw-leading-tight tw-my-auto md:tw-my-0" :class="{ 'text-white': isChosedDate, 'md:tw-bg-transparent tw-bg-yellow-green tw-rounded-full tw-w-8 tw-mx-auto': hasPosts }" >
      {{ dateOfCalendar.isDisable ? '' : dateOfCalendar.date.getDate() }}
    </span>
    <div class="tw-hidden md:tw-flex tw-flex-col tw-space-y-1">
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
    const route = useRoute();
    const isChosedDate = computed(() => !props.dateOfCalendar.isDisable && route.params.dateString === props.dateOfCalendar.dateString);

    const watchDataLoaded = () => {
      watch(
        () => props.dateOfCalendar,
        () => {
          if (isChosedDate.value) {
            store.commit('setCurrentDate', props.dateOfCalendar);
          }
        },
        { deep: true },
      );
    };
    watchDataLoaded();

    const chooseDate = () => {
      if (!props.dateOfCalendar.isDisable) {
        if (isChosedDate.value) {
          router.push({ name: 'DateDetail', params: { dateString: store.state.currentDate.dateString } });
        } else {
          store.commit('setCurrentDate', props.dateOfCalendar);
          router.push({ name: 'Calendar', params: { dateString: store.state.currentDate.dateString } });
        }
      }
    };

    const postsToDisplay = computed(() => {
      const { posts } = props.dateOfCalendar;
      if (!posts) return [];
      if (posts.length > 3) {
        return posts.slice(0, 2);
      }
      return posts;
    });

    const hasPosts = computed(() => postsToDisplay.value.length > 0);

    return {
      chooseDate,
      isChosedDate,
      postsToDisplay,
      hasPosts,
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

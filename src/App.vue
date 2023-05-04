<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="`/calendar/${dateToString(currentDate.date)}`">Calendar</router-link>
  </div> -->
  <router-view/>
  <Svgs class="tw-hidden" />
</template>

<script>
import dateToString from '@/helpers/dateFormateHelper';
import { useStore } from '@/store';
import { computed } from 'vue';
import Svgs from '@/components/Svgs.vue';

export default {
  components: { Svgs },
  setup() {
    const store = useStore();
    const currentDate = computed(() => store.state.currentDate);
    return {
      dateToString,
      currentDate,
    };
  },
};
</script>

<style lang="scss">
@import "~@/scss/colors";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4c4c4e;
  font-size: 1.5rem;
  font-weight: 900;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

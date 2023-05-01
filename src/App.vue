<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="`/calendar/${dateToString(currentDate.date)}`">Calendar</router-link>
  </div> -->
  <router-view/>
</template>

<script>
import dateToString from '@/helpers/dateFormateHelper';
import { useStore } from '@/store';
import { computed } from 'vue';

export default {
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
@font-face {
  font-family: myFirstFont;
  src: url('./assets/ChenYuluoyan-Thin-Monospaced.ttf');
  // src: url('./assets/ChenYuluoyan-Thin.ttf');
}

* {
  font-family: myFirstFont;
}

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

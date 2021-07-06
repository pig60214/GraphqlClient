import { createStore } from 'vuex';
import DateOfCalendar from '@/class/DateOfCalendar';

export default createStore({
  state: {
    currentDay: new DateOfCalendar(),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

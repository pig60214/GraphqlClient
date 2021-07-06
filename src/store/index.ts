import { createStore } from 'vuex';
import DateOfCalendar from '@/class/DateOfCalendar';

export default createStore({
  state: {
    currentDate: new DateOfCalendar(),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

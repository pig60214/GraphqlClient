import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import DateOfCalendar from '@/class/DateOfCalendar';
import MonthOfCalendar from '@/class/MonthOfCalendar';

export interface State {
  currentMonth: MonthOfCalendar
  currentDate: DateOfCalendar
}

export const key: InjectionKey<Store<State>> = Symbol('Copy From Vuex Doc');

export const store = createStore<State>({
  state: {
    currentMonth: new MonthOfCalendar((new Date()).getFullYear(), (new Date()).getMonth()),
    currentDate: new DateOfCalendar((new Date())),
  },
  mutations: {
    setCurrentDate(state, dateString: string) {
      const notISODateString = dateString.replace(/-/g, '.');
      const date = new Date(notISODateString);
      const monthOfCalendar = new MonthOfCalendar(date.getFullYear(), date.getMonth());
      state.currentMonth = monthOfCalendar;

      const dateOfCalendar = new DateOfCalendar();
      dateOfCalendar.date = date;
      state.currentDate = dateOfCalendar;
    },
  },
  actions: {
  },
  modules: {
  },
});

export function useStore() : Store<State> {
  return baseUseStore(key);
}

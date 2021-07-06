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
    currentDate: new DateOfCalendar(),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

export function useStore() : Store<State> {
  return baseUseStore(key);
}

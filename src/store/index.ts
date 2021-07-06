import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import DateOfCalendar from '@/class/DateOfCalendar';

export interface State {
  currentDate: DateOfCalendar
}

export const key: InjectionKey<Store<State>> = Symbol('Copy From Vuex Doc');

export const store = createStore<State>({
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

export function useStore() : Store<State> {
  return baseUseStore(key);
}

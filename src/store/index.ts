import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import DateOfCalendar from '@/class/DateOfCalendar';
import MonthOfCalendar from '@/class/MonthOfCalendar';
import Photo from '@/interface/Photo';

export interface State {
  currentMonth: MonthOfCalendar
  currentDate: DateOfCalendar
  photosInCarousel: Photo[]
  showPhotoInMobile: boolean
}

export const key: InjectionKey<Store<State>> = Symbol('Copy From Vuex Doc');

export const store = createStore<State>({
  state: {
    currentMonth: new MonthOfCalendar((new Date()).getFullYear(), (new Date()).getMonth()),
    currentDate: new DateOfCalendar((new Date())),
    photosInCarousel: [],
    showPhotoInMobile: false,
  },
  mutations: {
    setCurrentMonth(state, dateString: string) {
      const date = new Date(dateString);
      const monthOfCalendar = new MonthOfCalendar(date.getFullYear(), date.getMonth());
      state.currentMonth = monthOfCalendar;
    },
    setCurrentDate(state, date: DateOfCalendar) {
      state.currentDate = date;
      state.photosInCarousel = date.photos;
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

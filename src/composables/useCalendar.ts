import DateOfCalendar from '@/class/DateOfCalendar';
import Photo from '@/interface/Photo';
import { computed } from 'vue';
import { useStore } from '@/store';

export default function useCalendar() {
  const store = useStore();

  const addEmptyDateOfCalendarAtBeginning = (startDate: Date, dateList: Array<DateOfCalendar>) => {
    if (startDate.getDay() !== 0) {
      let count = startDate.getDay();
      while (count > 0) {
        const nullDateOfCalener = new DateOfCalendar();
        dateList.push(nullDateOfCalener);
        count -= 1;
      }
    }
  };

  const addEmptyDateOfCalendarAtEnd = (startDate: Date, dateList: Array<DateOfCalendar>) => {
    if (startDate.getDay() !== 6) {
      let count = startDate.getDay();
      while (count < 7) {
        const nullDateOfCalener = new DateOfCalendar();
        dateList.push(nullDateOfCalener);
        count += 1;
      }
    }
  };

  const dateListOfCurrentMonth = computed(() => {
    const dateList = new Array<DateOfCalendar>();
    const { year, month } = store.state.currentMonth;
    const date = new Date(year, month, 1);

    addEmptyDateOfCalendarAtBeginning(date, dateList);
    let c = 0;
    while (date.getMonth() === month) {
      const photo1 : Photo = { path: 'https://i.imgur.com/WvF2XFu_d.webp?maxwidth=760&fidelity=grand', caption: date.getDate().toString() };
      const photo2 : Photo = { path: 'https://i.imgur.com/O6usdNx_d.webp?maxwidth=760&fidelity=grand', caption: 'Tree House 2' };

      const dateOfCalendar = new DateOfCalendar();
      dateOfCalendar.date = new Date(date.getTime());
      if (c === 0) {
        dateOfCalendar.posts = [{ title: 'Test1234567', photos: [photo1, photo2] }, { title: 'Test1234567', photos: [photo1, photo2] }];
        c = 1;
      } else {
        dateOfCalendar.posts = [{ title: 'Test1234567', photos: [photo1] }, { title: 'Test1234567', photos: [photo2] }];
        c = 0;
      }

      dateList.push(dateOfCalendar);

      date.setDate(date.getDate() + 1);
    }

    addEmptyDateOfCalendarAtEnd(date, dateList);

    return dateList;
  });

  return { dateListOfCurrentMonth };
}

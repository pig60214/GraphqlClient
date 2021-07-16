import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import DateOfCalendar from '@/class/DateOfCalendar';
import Post from '@/interface/Post';
import { computed, toRefs } from 'vue';
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

  const { year, month } = toRefs(store.state.currentMonth);

  const getThisMonthPosts = () => {
    const firstDate = new Date(year.value, month.value, 1);
    const lastDate = new Date(year.value, month.value + 1, 0);

    const firstDateString = `${firstDate.getFullYear()}/${firstDate.getMonth() + 1}/${firstDate.getDate()}`;
    const lastDateString = `${lastDate.getFullYear()}/${lastDate.getMonth() + 1}/${lastDate.getDate()}`;

    const { result } = useQuery(gql`
      query ($postsQueryInput: PostsQueryInput!){
        posts(postsQueryInput: $postsQueryInput){
          id,
          title,
          from,
          to,
          photos {
            path,
            caption
          },
        }
      }
    `, {
      postsQueryInput: {
        from: firstDateString,
        to: lastDateString,
      },
    });

    if (result.value) {
      const { posts } = result.value;
      return posts as Post[];
    }
    return result.value as Post[];
  };

  const dateListOfCurrentMonth = computed(() => {
    const dateList = new Array<DateOfCalendar>();
    const date = new Date(year.value, month.value, 1);

    const posts = getThisMonthPosts();
    addEmptyDateOfCalendarAtBeginning(date, dateList);

    while (date.getMonth() === month.value) {
      const dateOfCalendar = new DateOfCalendar();
      const newDate = new Date(date.getTime());
      dateOfCalendar.date = newDate;

      if (posts && posts.length > 0) {
        dateOfCalendar.posts = posts.filter(post => {
          const from = new Date(post.from);
          const to = new Date(post.to);
          return newDate.getTime() >= from.getTime() && newDate.getTime() <= to.getTime();
        });
      }

      dateList.push(dateOfCalendar);

      date.setDate(date.getDate() + 1);
    }

    addEmptyDateOfCalendarAtEnd(date, dateList);

    return dateList;
  });

  const weekListOfCurrentMonth = computed(() => {
    const weekList = new Array<Array<DateOfCalendar>>();

    let start = 0;
    while (start < dateListOfCurrentMonth.value.length) {
      weekList.push(dateListOfCurrentMonth.value.slice(start, start + 7));
      start += 7;
    }

    return weekList;
  });

  return { dateListOfCurrentMonth, weekListOfCurrentMonth };
}

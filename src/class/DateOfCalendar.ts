import dateToString from '@/helpers/dateFormateHelper';
import Post from '../interface/Post';
import Photo from '../interface/Photo';

export default class DateOfCalendar {
  date? : Date

  posts? : Post[]

  constructor(date?: Date) {
    if (date) this.date = date;
  }

  get dateString(): string {
    if (this.date === undefined) {
      return '';
    }

    return dateToString(this.date);
  }

  get isDisable(): boolean {
    return this.date === undefined;
  }

  get photos(): (Photo | undefined)[] | undefined {
    return this.posts?.filter(post => post.photos !== null).map((post) => post.photos).flat();
  }

  equals(another: DateOfCalendar): boolean {
    if (this.isDisable && another.isDisable) {
      return true;
    }
    return this.date?.getTime() === another.date?.getTime();
  }
}

import Post from '../interface/Post';
import Photo from '../interface/Photo';

export default class DateOfCalendar {
  date? : Date

  posts? : Post[]

  get isDisable(): boolean {
    return this.date === undefined;
  }

  get photos(): (Photo | undefined)[] | undefined {
    return this.posts?.map((post) => post.photos).flat();
  }

  equals(another: DateOfCalendar): boolean {
    if (this.isDisable && another.isDisable) {
      return true;
    }
    return this.date?.getTime() === another.date?.getTime();
  }
}

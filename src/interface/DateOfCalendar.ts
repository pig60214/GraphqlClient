import Post from './Post';
import Photo from './Photo';

export default class DateOfCalendar {
  date? : Date

  posts? : Post[]

  get isDisable(): boolean {
    return this.date === undefined;
  }

  get photos(): (Photo | undefined)[] | undefined {
    return this.posts?.map((post) => post.photos).flat();
  }
}

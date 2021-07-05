import Post from './Post';

export default class DateOfCalendar {
  date? : Date

  posts? : Post[]

  get isDisable(): boolean {
    return this.date === undefined;
  }
}

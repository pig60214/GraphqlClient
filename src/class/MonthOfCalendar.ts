export default class MonthOfCalendar {
  year: number
  month: number

  addMonth(month : number) : void {
    const date = new Date(this.year, this.month, 1);
    date.setMonth(date.getMonth() + month);
    this.year = date.getFullYear();
    this.month = date.getMonth();
  }

  constructor(year: number, month: number) {
    this.year = year;
    this.month = month;
  }
}
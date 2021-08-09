import dateToString from '@/helpers/dateFormateHelper';
import DateOfCalendar from './DateOfCalendar';

export default class MonthOfCalendar {
  year: number

  month: number

  get firstDate(): Date {
    return new Date(this.year, this.month, 1);
  }

  get lastDate(): Date {
    return new Date(this.year, this.month + 1, 0);
  }

  get firstDateString(): string {
    return dateToString(this.firstDate);
  }

  get lastDateString(): string {
    return dateToString(this.lastDate);
  }

  get dateOfCalendarList(): DateOfCalendar[] {
    const dateList = new Array<DateOfCalendar>();
    const date = this.firstDate;

    this.addEmptyDateOfCalendarAtBeginning(date, dateList);

    while (date.getMonth() === this.month) {
      const dateOfCalendar = new DateOfCalendar();
      const newDate = new Date(date.getTime());
      dateOfCalendar.date = newDate;

      dateList.push(dateOfCalendar);

      date.setDate(date.getDate() + 1);
    }

    this.addEmptyDateOfCalendarAtEnd(date, dateList);
    return dateList;
  }

  get calendar(): DateOfCalendar[][] {
    const weekList = new Array<Array<DateOfCalendar>>();

    let start = 0;
    while (start < this.dateOfCalendarList.length) {
      weekList.push(this.dateOfCalendarList.slice(start, start + 7));
      start += 7;
    }
    return weekList;
  }

  addMonth(month : number) : Date {
    const date = new Date(this.year, this.month, 1);
    date.setMonth(date.getMonth() + month);
    return date;
  }

  private addEmptyDateOfCalendarAtBeginning = (startDate: Date, dateList: Array<DateOfCalendar>) => {
    if (startDate.getDay() !== 0) {
      let count = startDate.getDay();
      while (count > 0) {
        const nullDateOfCalener = new DateOfCalendar();
        dateList.push(nullDateOfCalener);
        count -= 1;
      }
    }
  }

  private addEmptyDateOfCalendarAtEnd = (startDate: Date, dateList: Array<DateOfCalendar>) => {
    if (startDate.getDay() !== 0) {
      let count = startDate.getDay();
      while (count < 7) {
        const nullDateOfCalener = new DateOfCalendar();
        dateList.push(nullDateOfCalener);
        count += 1;
      }
    }
  }

  constructor(year: number, month: number) {
    this.year = year;
    this.month = month;
  }
}

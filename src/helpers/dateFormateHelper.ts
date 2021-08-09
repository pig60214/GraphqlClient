export default function dateToString(date: Date) {
  const dateForToString = new Date(date.getTime());
  dateForToString.setHours(8);
  return dateForToString.toISOString().substr(0, 10);
}

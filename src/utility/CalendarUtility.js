export function generateCalendar(year, month) {
  const calendar = [];
  const date = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = date.getDay();

  // Create empty slots for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendar.push(null);
  }

  const extraDaysCheck = daysInMonth%7 + firstDayOfWeek - 7;
  // Create slots for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    if (extraDaysCheck > 0 && day > daysInMonth - extraDaysCheck) {
      calendar[day - (daysInMonth - extraDaysCheck) - 1] = day;
    } else {
      calendar.push(day);
    }
  }

  // Add remaining empty slots to complete the calendar grid
  const remainingSlots = 7 - (calendar.length % 7);
  for (let i = 0; i < remainingSlots && remainingSlots < 7; i++) {
    calendar.push(null);
  }

  return calendar;
}

import React, { useEffect } from "react";
import { generateCalendar } from "../../utility/CalendarUtility";

// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import { getBirthdays } from "../../utility/redux-store/birthdaySlice";

function CalendarMonth(props) {
  const { monthNumber, yearNumber } = props;

  const monthData = generateCalendar(yearNumber, monthNumber);
  let weeks = [];

  for (let i = 0; i < monthData.length; i += 7) {
    weeks.push(
      monthData.slice(i, i + 7).map((day, idx) => {
        return (
          <h3
            className={`calendar-card-day ${day ? "" : "no-bg-day"}`}
            name={`day-${monthNumber}-${day}`}
            key={idx}
          >
            {day ? day : ""}
          </h3>
        );
      })
    );
  }

  weeks = weeks.map((week, idx) => {
    return (
      <div className="calendar-week" key={idx}>
        {week}
      </div>
    );
  });

  const monthName = new Date(
    Date.parse(monthNumber + 1 + " 1, 2012")
  ).toLocaleString("default", { month: "long" });

  useEffect(() => {
    const birthdays = {
      0 : {
        4 : ["Birthday 1"],
        7 : ["Birthday 2"],
      },
      1 : {
        2 : ["Birthday 3"],
        9 : ["Birthday 4"],
      },
      2 : {
        3 : ["Birthday 5", "Birthday 6", "Birthday 6", "Birthday 6"],
        14 : ["Birthday 7","Birthday 5", "Birthday 6"],
        30 : ["Birthday 8","Birthday 5"],
      },
    }

    const birthdayColors = {
      0 : "#f1f1f1",
      1 : "#FE3D3DD0",
      2 : "#CF4331",
      3 : "#A03325",
      4 : "#712218",
      5 : "#5A1A12",
      6 : "#42120C",
      7 : "#2B0A06",
      8 : "#130200",
    }
  
    birthdays.hasOwnProperty(monthNumber) && Object.keys(birthdays[monthNumber]).forEach((day) => {
        // console.log(`day-${monthNumber}-${day}`)
        const dayElement = document.getElementsByName(`day-${monthNumber}-${day}`)[0];
        // dayElement.style.backgroundColor = "red";
        // dayElement.style.color = "white";
      
        // console.log(birthdays[monthNumber][day].length)

        const styles = {
          backgroundColor: birthdayColors[birthdays[monthNumber][day].length],
          color: 'white',
  
          // padding: `${0.2*birthdays[monthNumber][day].length + 0.5}rem`,
          // opacity: 0.4 + 0.2*birthdays[monthNumber][day].length,
        };
        
        Object.assign(dayElement.style, styles);
      })
  })

  return (
    <>
      <div className="calendar-card">
        <div className="calendar-card-header">
          <h1 className="calendar-month-title">{monthName}</h1>
          <div className="calendar-week-header">
            {
              // Rendering the WeekDay Headers
              ["S", "M", "T", "W", "T", "F", "S"].map((day, index) => {
                return (
                  <h3 className="calendar-card-sub-title" key={index}>
                    {day}
                  </h3>
                );
              })
            }
          </div>
        </div>
        <div className="calendar-days">{weeks}</div>
      </div>
    </>
  );
}

export default CalendarMonth;

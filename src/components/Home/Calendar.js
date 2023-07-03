import React, { useState } from "react";
import CalendarMonth from "./CalendarMonth";

function Calendar() {
  const currentYear = new Date().getFullYear();
  const months = [0,1,2,3,4,5,6,7,8,9,10,11];

  // Carousel Logic
  const [activeIndex, setActiveIndex] = useState(0);
  const [innerStyle, setInnerStyle] = useState({});

  const changeIndex = (index) => {
    const tempIndex = activeIndex + index;
    if (tempIndex < 0 || tempIndex > months.length-1) return;
    setInnerStyle({ transform: `translateX(${tempIndex * -100}%)` });
    setActiveIndex(tempIndex);
  };

  // Swipe Handling Logic
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) changeIndex(1);
    if (isRightSwipe) changeIndex(-1);
  };


  return (
    <>
      <section className="calendar-section" id="calendar-section"   onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="calendar-title">
          <h1 className="calendar-title-text">
            Check Out your birthday calendar
          </h1>
        </div>

        <div className="calendar-card-carousel">
          <div className="calendar-card-carousel-inner" style={innerStyle}>
            {
              // Rendering the Calendar Cards
              months.map((month, index) => {
                return <CalendarMonth key={index} monthNumber={month} yearNumber={currentYear} />;
              })
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Calendar;

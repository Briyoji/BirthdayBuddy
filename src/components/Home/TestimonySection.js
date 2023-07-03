import React, { useState } from "react";
import TestimonyCard from "./TestimonyCard";

function TestimonySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [innerStyle, setInnerStyle] = useState({});
  

  const changeIndex = (index) => {
    const tempIndex = activeIndex + index;
    if (tempIndex < 0 || tempIndex > 4) return;
    setInnerStyle({ transform: `translateX(${tempIndex * -88}%)` });
    setActiveIndex(tempIndex);
  };

  // Swipe Handling Logic
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50 

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) changeIndex(1)
    if (isRightSwipe) changeIndex(-1)
  }

  return (
    <>
      <section className="testimony-section" id="testimony-section"  onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <h3 className="testimony-sub-title">testimonials</h3>
        <h2 className="testimony-title">Read what others have to say</h2>

        <div className="testimony-carousel" id="testimony-carousel">
          <div className="testimony-carousel-inner" 
            style={innerStyle}
          >
            <TestimonyCard />
            <TestimonyCard />
            <TestimonyCard />
            <TestimonyCard />
            <TestimonyCard />
          </div>
        </div>
      </section>
    </>
  );
}

export default TestimonySection;

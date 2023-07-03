import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <section className="hero-section" id="hero-section">
        <h1 className="hero-title">Never Miss A Special Day Again!</h1>

        <h3 className="hero-sub-title">The best app for keeping track of birthdays of your loved ones.</h3>

        <Link to='/' className='hero-cta'>get started</Link>
      </section>
    </>
  );
}

export default HeroSection;

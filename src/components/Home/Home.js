import React from "react";

import HeroSection from "./HeroSection";
import TestimonySection from "./TestimonySection";
import Dashboard from "./Dashboard";
import Calendar from "./Calendar";

function Home() {
  const loggedIn = true;

  return (
    <>
      {!loggedIn && (
        <>
          <HeroSection />
          <TestimonySection />

        </>
      )}
      
      {loggedIn && (
        <>
          <Dashboard />
          <Calendar />
        </>
      )}
    </>
  );
}

export default Home;

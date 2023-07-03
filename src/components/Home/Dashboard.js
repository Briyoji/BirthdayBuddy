import React from "react";
import confetti from "../../images/confetti.png";
import pastry from "../../images/pastry.png";

function Dashboard() {
  return (
    <>
      <section className="dashboard-section" id="dashboard-section">
        <div className="main-dashboard dashboard-card">
          <h1 className="dashboard-card-title">Dashboard</h1>
          <h3 className="dashboard-card-sub-title">
            Total Number of birthdays
          </h3>
          <div className="align-right">
            <h2 className="yearly-count">14</h2>
            <h4 className="new-birthday-btn">add new!</h4>
          </div>
          <div className="dashboard-card-image-outer">
            <img src={confetti} alt="" className="dashboard-card-image" />
          </div>
        </div>
        <div className="secondary-dashboard dashboard-card">
          <div className="card-header">
          <h1 className="dashboard-card-title">Monthly Dashboard</h1>
          <h3 className="dashboard-card-sub-title">
            Total Birthdays this Month: <span>14</span>
          </h3>
          </div>
          <div className="dashboard-card-content">
            <ul>
              <li>
                <h4 className="dashboard-card-item">
                  <span>14th - </span> Someone's Birthday
                </h4>
              </li>
              <li>
                <h4 className="dashboard-card-item">
                  <span>14th - </span> Someone's Birthday
                </h4>
              </li>
              <li>
                <h4 className="dashboard-card-item">
                  <span>14th - </span> Someone's Birthday
                </h4>
              </li>
              <li>
                <h4 className="dashboard-card-item">
                  <span>14th - </span> Someone's Birthday
                </h4>
              </li>
              <li>
                <h4 className="dashboard-card-item">
                  <span>14th - </span> Someone's Birthday
                </h4>
              </li>
            </ul>
          </div>
          <div className="dashboard-card-image-outer">
            <img src={pastry} alt="" className="dashboard-card-image" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;

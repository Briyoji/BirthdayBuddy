import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Profile() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const handleInputChange = event => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
    event.target.value = numericValue;
  };

  return (
    <div>
      <label htmlFor="date-input">Select or enter a date:</label>
      <ReactDatePicker
        id="date-input"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd-MM-yyyy" // Format the date as desired
        placeholderText="dd-mm-yyyy" // Placeholder text for the input
        customInput={
          <input
            type="text"
            inputMode="numeric" // Allow only numeric input
            onChange={handleInputChange}
          />
        }
      />
    </div>
  );
}

export default Profile
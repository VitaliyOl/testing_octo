import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = date => {
    if (!startDate || date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
      onChange([startDate, date]);
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Select start date"
      />
      <DatePicker
        selected={endDate}
        onChange={handleChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Select end date"
      />
    </div>
  );
};

export default DateRangePicker;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ChooseDate = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
      />
    );
  };

export default ChooseDate;


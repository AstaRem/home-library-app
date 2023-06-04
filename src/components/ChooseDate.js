import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ChooseDate = (props) => {
console.log("props.date",props.date);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (props.date!==""){
      let d = new Date(props.date.split("/").reverse().join("-"));
        setStartDate (d);
    }else{
      setStartDate (null);
    }
    if(props.isClosed){
      console.log("modal is closed");
      setStartDate (null);
    }
  },[props.date, props.isClosed]);

    

    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Click to select a date"
      />
    );
  };

export default ChooseDate;


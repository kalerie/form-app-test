import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyDatePickerProps } from "../models/Forms.model";

const MyDatePicker: React.FC<MyDatePickerProps> = ({ data, onDateChange }) => {
  const [inputValue, setInputValue] = useState(data);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const response = await fetch(
          "https://api.api-ninjas.com/v1/holidays?country=PL&year=2024&type=NATIONAL_HOLIDAY",
          {
            headers: {
              "X-Api-Key": "8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setDisabledDates(data.map((el: T) => new Date(el.date)));
      } catch (error) {
        console.error("Error fetching disabled dates:", error);
      }
    };

    fetchDisabledDates();
  }, []);

  const filterDates = (date: Date) => {
    return !disabledDates.some(
      (disabledDate) =>
        date.getFullYear() === disabledDate.getFullYear() &&
        date.getMonth() === disabledDate.getMonth() &&
        date.getDate() === disabledDate.getDate()
    );
  };

  const handleSelect = (e) => {
    setInputValue(e);
    onDateChange(e);
  };

  return (
    <div>
      <DatePicker
        selected={inputValue}
        onChange={handleSelect}
        showTimeSelect
        filterDate={filterDates}
        dateFormat="MMMM d, yyyy h:mm aa"
        inline
        disabled={!inputValue}
      />
    </div>
  );
};

export default MyDatePicker;

import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface DateSelectorProps {
    dateChange: (date: Date) => void;
    id?: string;
}


const DateSelector: React.FC<DateSelectorProps> = ({ dateChange, id }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = (date: Date) => {
        setSelectedDate(date);
        dateChange(date);
    }

    return (
        <DatePicker
        dateFormat="dd/MM/yyyy HH:mm"
        selected={selectedDate}
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={10}
        onChange={handleChange} />
    );
};

export default DateSelector;
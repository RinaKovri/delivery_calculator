import * as React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DateConstructor {
    startDate: Date;
}

interface DateSelectorProps {
    dateChange: (date: Date) => void;
}


export class DateSelector extends React.Component<DateSelectorProps, DateConstructor> {
    constructor(props: DateSelectorProps) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(date: Date) {
        console.log(date);  
        this.setState({
            startDate: date
        });

        this.props.dateChange(date);
    }

    public render() {
        const { startDate } = this.state;
        return (
            <DatePicker
                dateFormat="dd/MM/yyyy HH:mm"
                selected={startDate}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                onChange={this.handleChange}
            />
        )
    }
}
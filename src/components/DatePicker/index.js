import React from 'react';
import DatePickerComponent from 'react-datepicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import 'react-datepicker/dist/react-datepicker.css';

import { DataPickerDiv } from './style';

dayjs.extend(utc);
dayjs.extend(dayjsPluginUTC);

export default function DatePicker({ label, selected, onChange, placeholder }) {
  return (
    <DataPickerDiv>
      <label>{label}</label>
      <DatePickerComponent
        placeholderText={placeholder}
        showTimeSelect
        onChange={onChange}
        selected={selected}
        timeIntervals={5}
        dateFormat="MMMM d, yyyy HH:mm"
        timeFormat="HH:mm"
        minDate={new Date(dayjs().subtract(1, 'year'))}
        maxDate={dayjs().toDate()}
      />
    </DataPickerDiv>
  );
}

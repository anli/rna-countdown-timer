import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import {ButtonTextInput} from '@ui';
import moment from 'moment';
import React, {useState} from 'react';
import {Platform, TextInputProps} from 'react-native';

const getDataValue = (date: Date): string =>
  moment(date)
    .hours(0)
    .seconds(0)
    .milliseconds(0)
    .format('YYYY-MM-DD');

const getPresentValue = (value?: string): string =>
  value ? moment(value).format('DD/MM/YYYY') : '';

const DateInput = ({
  onChangeText,
  value,
  ...props
}: TextInputProps & {error: string | false | undefined}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (selectedDate && onChangeText) {
      const dataValue = getDataValue(currentDate);
      return onChangeText(dataValue);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const onShowDatePicker = () => {
    showMode('date');
  };

  return (
    <>
      <ButtonTextInput
        onPress={onShowDatePicker}
        {...props}
        value={getPresentValue(value)}
      />
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </>
  );
};

export default DateInput;

import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import {ButtonTextInput} from '@ui';
import moment from 'moment';
import React, {useState} from 'react';
import {Platform, TextInputProps} from 'react-native';

const getDataValue = (date: Date): string =>
  moment(date)
    .milliseconds(0)
    .format('HH:mm');

const getPresentValue = (value?: string): string =>
  value ? moment(value, 'HH:mm').format('h:mmA') : '';

const TimeInput = ({
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

    if (event.type === 'neutralButtonPressed' && onChangeText) {
      return onChangeText('');
    }

    if (selectedDate && onChangeText) {
      const dataValue = getDataValue(currentDate);
      return onChangeText(dataValue);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const onShowTimePicker = () => {
    showMode('time');
  };

  return (
    <>
      <ButtonTextInput
        onPress={onShowTimePicker}
        {...props}
        value={getPresentValue(value)}
      />
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
          neutralButtonLabel="clear"
        />
      )}
    </>
  );
};

export default TimeInput;

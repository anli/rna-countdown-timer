import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import {ButtonTextInput} from '@ui';
import moment from 'moment';
import React, {useState} from 'react';
import {Platform, TextInputProps} from 'react-native';

const getDataValue = (
  date: Date,
  dataFormat: string,
  mode: 'date' | 'time',
): string => {
  if (mode === 'time') {
    return moment(date)
      .milliseconds(0)
      .format(dataFormat);
  }

  return moment(date)
    .hours(0)
    .seconds(0)
    .milliseconds(0)
    .format(dataFormat);
};

const getPresentValue = (
  value: string | undefined,
  dataFormat: string,
  presentFormat: string,
): string => (value ? moment(value, dataFormat).format(presentFormat) : '');

const TimeInput = ({
  onChangeText,
  value,
  type,
  dateTimePickerProps,
  dataFormat,
  presentFormat,
  ...props
}: TextInputProps & {
  dataFormat: string;
  presentFormat: string;
  dateTimePickerProps: any;
  type: 'date' | 'time';
  error: string | false | undefined;
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    if (onChangeText) {
      onChangeText(
        getOnChangeTextValue(event.type, selectedDate, date, dataFormat, mode),
      );
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const onShowPicker = () => {
    showMode(type);
  };

  return (
    <>
      <ButtonTextInput
        onPress={onShowPicker}
        {...props}
        value={getPresentValue(value, dataFormat, presentFormat)}
      />
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
          neutralButtonLabel="clear"
          {...dateTimePickerProps}
        />
      )}
    </>
  );
};

export default TimeInput;

const getOnChangeTextValue = (
  type: string,
  selectedDate: Date | undefined,
  currentDate: Date,
  dataFormat: string,
  mode: 'date' | 'time',
) => {
  if (type === 'neutralButtonPressed') {
    return '';
  }

  if (selectedDate) {
    return getDataValue(selectedDate, dataFormat, mode);
  }

  return getDataValue(currentDate, dataFormat, mode);
};

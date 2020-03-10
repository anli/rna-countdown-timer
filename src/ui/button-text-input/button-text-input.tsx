import {TextInput} from '@ui';
import React from 'react';
import {TextInputProps, TouchableOpacity} from 'react-native';

type ButtonTextInputProps = {onPress: () => void} & TextInputProps;
const ButtonTextInput = ({onPress, ...props}: ButtonTextInputProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextInput {...props} editable={false} selectTextOnFocus={false} />
    </TouchableOpacity>
  );
};

export default ButtonTextInput;

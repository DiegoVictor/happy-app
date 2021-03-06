import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps {
  name: string;
  style?: {
    [key: string]: any;
  };
  multiline?: boolean;
  testID: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({
  name,
  ...rest
}) => {
  const inputRef = useRef<any>(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      ref={inputRef}
      keyboardAppearance="dark"
      defaultValue={defaultValue}
      onChangeText={value => {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      }}
      {...rest}
    />
  );
};

export default Input;

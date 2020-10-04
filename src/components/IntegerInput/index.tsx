import React, { FC, forwardRef } from 'react';
import NumberFormat from 'react-number-format';

import { TextField } from '@material-ui/core';

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={0}
    />
  );
}

export type IntegerInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  fullwidth: boolean;
  disabled?: boolean;
  error: boolean;
  helperText: string;
  handleEnter?: () => void;
  handleF9?: () => void;
};

const IntegerInput = forwardRef<any, IntegerInputProps>(
  (
    {
      label,
      value,
      onChange,
      fullwidth,
      disabled = false,
      error,
      helperText,
      handleEnter = () => {},
      handleF9 = () => {},
    },
    forwardedRef,
  ) => {
    return (
      <TextField
        label={label}
        // margin="dense"
        margin="normal"
        value={value}
        variant="outlined"
        fullWidth={fullwidth}
        color="secondary"
        disabled={disabled}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        error={error}
        helperText={helperText}
        inputRef={forwardedRef}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleEnter();
          if (e.key === 'F9') handleF9();
        }}
        // size="small"
      />
    );
  },
);

export default IntegerInput;

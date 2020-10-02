import React, { FC } from 'react';
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
};

const IntegerInput: FC<IntegerInputProps> = ({
  label,
  value,
  onChange,
  fullwidth,
  disabled = false,
  error,
  helperText,
}) => {
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
      // size="small"
    />
  );
};

export default IntegerInput;

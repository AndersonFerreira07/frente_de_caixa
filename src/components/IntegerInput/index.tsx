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
};

const IntegerInput: FC<IntegerInputProps> = ({
  label,
  value,
  onChange,
  fullwidth,
}) => {
  return (
    <TextField
      label={label}
      margin="normal"
      value={value}
      variant="outlined"
      fullWidth={fullwidth}
      color="secondary"
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
};

export default IntegerInput;

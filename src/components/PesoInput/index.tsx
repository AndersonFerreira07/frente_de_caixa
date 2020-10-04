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
      suffix="Kg"
      decimalScale={3}
      fixedDecimalScale
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
    />
  );
}

export type PesoInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  fullwidth: boolean;
  disabled: boolean;
  handleEnter?: () => void;
};

const PesoInput = forwardRef<any, PesoInputProps>(
  (
    {
      label,
      value,
      onChange,
      fullwidth,
      disabled = false,
      handleEnter = () => {},
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
        disabled={disabled}
        color="secondary"
        onChange={(e) => onChange(parseFloat(e.target.value))}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        inputRef={forwardedRef}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleEnter();
        }}
        // size="small"
      />
    );
  },
);

export default PesoInput;

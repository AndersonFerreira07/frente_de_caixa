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
  handleF4?: () => void;
  handleF8?: () => void;
  handleF9?: () => void;
  handleF10?: () => void;
  handleDirection?: (direction: number) => void;
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
      handleF4 = () => {},
      handleF8 = () => {},
      handleF9 = () => {},
      handleF10 = () => {},
      handleDirection = (direction: number) => {},
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
        onKeyDown={(e) => {
          if (e.keyCode === 13) handleEnter();
          if (e.keyCode === 120) handleF9();
          if (e.keyCode === 38) handleDirection(38);
          if (e.keyCode === 40) handleDirection(40);
          if (e.keyCode === 121) handleF10();

          if (e.keyCode === 115) handleF4();
          if (e.keyCode === 119) handleF8();
        }}
        // size="small"
      />
    );
  },
);

export default PesoInput;

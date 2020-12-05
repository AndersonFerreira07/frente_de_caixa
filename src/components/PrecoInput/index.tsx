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
      prefix="R$: "
      decimalScale={2}
      thousandSeparator="."
      decimalSeparator=","
      fixedDecimalScale
      isNumericString
    />
  );
}

export type PrecoInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  fullwidth: boolean;
  disabled: boolean;
  error?: boolean;
  helperText?: string;
  handleEnter?: () => void;
  handleF4?: () => void;
  handleF8?: () => void;
  handleDirection?: (direction: number) => void;
  autoFocus?: boolean;
};

const PrecoInput = forwardRef<any, PrecoInputProps>(
  (
    {
      label,
      value,
      onChange,
      fullwidth,
      disabled = false,
      error = false,
      helperText = '',
      handleEnter = () => {},
      handleF4 = () => {},
      handleF8 = () => {},
      handleDirection = (direction: number) => {},
      autoFocus = false,
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
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        error={error}
        helperText={helperText}
        inputRef={forwardedRef}
        onKeyDown={(e) => {
          if (e.keyCode === 13) handleEnter();
          if (e.keyCode === 38) handleDirection(38);
          if (e.keyCode === 40) handleDirection(40);

          if (e.keyCode === 115) handleF4();
          if (e.keyCode === 119) handleF8();
        }}
        // autoFocus={autoFocus}
        // select={autoFocus}

        // size="small"
      />
    );
  },
);

export default PrecoInput;

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
};

const PrecoInput: FC<PrecoInputProps> = ({
  label,
  value,
  onChange,
  fullwidth,
  disabled = false,
  error = false,
  helperText = '',
}) => {
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
      // size="small"
    />
  );
};

export default PrecoInput;

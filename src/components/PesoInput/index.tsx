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
};

const PesoInput: FC<PesoInputProps> = ({
  label,
  value,
  onChange,
  fullwidth,
  disabled = false,
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
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      // size="small"
    />
  );
};

export default PesoInput;

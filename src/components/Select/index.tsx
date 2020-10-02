import React, { FC } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      /* margin: theme.spacing(1),
      minWidth: 120, */
      margin: '16px 0 8px 0',
    },
    selectEmpty: {
      /* marginTop: theme.spacing(2), */
    },
  }),
);

type Row = {
  value: number;
  /* label: string; */
};

type RowFormatted = {
  value: number;
  label: string;
};

export type SelectProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  lista: Row[];
  disabled: boolean;
  fullwidth: boolean;
};

const Select2: FC<SelectProps> = ({
  value,
  onChange,
  label,
  lista,
  disabled,
  fullwidth,
}) => {
  const classes = useStyles();

  function formatMoeda(valor: number) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function formatList() {
    const listaFormatada: Array<RowFormatted> = [];
    for (let i = 0; i < lista.length; i += 1) {
      listaFormatada.push({
        value: lista[i].value,
        label: formatMoeda(lista[i].value),
      });
    }
    return listaFormatada;
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(parseFloat(event.target.value as string));
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      fullWidth={fullwidth}
    >
      <InputLabel id="demo-simple-select-outlined-label" color="secondary">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        label={label}
        color="secondary"
        disabled={disabled}
        fullWidth={fullwidth}
      >
        {formatList().map((item) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Select2;

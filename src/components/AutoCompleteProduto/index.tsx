import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  RefForwardingComponent,
  useRef,
  useEffect,
} from 'react';

import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { stringify } from 'query-string';

import api from '../../services/api';
import { getHost } from '../../services/host';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      opacity: '0.75',
      // width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      color: theme.palette.secondary.main,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export type AutoCompleteProdutoProps = {
  value: any;
  onChange: (newValor: any) => void;
  handleEnter?: () => void;
  inputValue: string;
  valueDebounce: string;
  updateValue: (newValue: string) => void;
  label: string;
  handleF4: (code: number) => void;
};

export type AutoCompleteProdutoHandle = {
  focus: () => void;
};

const AutoCompleteProdutos: RefForwardingComponent<
  AutoCompleteProdutoHandle,
  AutoCompleteProdutoProps
> = (
  {
    value,
    onChange,
    handleEnter = () => {},
    inputValue,
    updateValue,
    valueDebounce,
    label,
    handleF4,
  },
  forwardedRef,
) => {
  /* const AutoCompleteProdutos = forwardRef<any, AutoCompleteProdutoProps>(
  (
    {
      value,
      onChange,
      handleEnter = () => {},
      inputValue,
      updateValue,
      valueDebounce,
      label,
    },
    forwardedRef,
  ) => { */
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const classes = useStyles();
  const refAutoComplete = useRef<any>(null);

  useImperativeHandle(forwardedRef, () => ({
    focus() {
      if (refAutoComplete.current) {
        refAutoComplete.current.focus();
      }
    },
  }));

  function query(url) {
    const query2 = {
      sort: JSON.stringify(['id', 'asc']),
      range: JSON.stringify([1, 10]),
      filter: JSON.stringify({
        nome: valueDebounce,
      }),
    };
    return `${url}/?${stringify(query2)}`;
  }

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    (async () => {
      const produtos = await api(query(`${getHost()}/produtos/search`));
      await sleep(1e3);
      setOptions(produtos.data.data);
    })();
  }, [valueDebounce]);

  console.log('forwardedRef kkkkkkkkkkkkkkkkk');
  console.log(forwardedRef);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: '100%' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        updateValue(newInputValue);
      }}
      getOptionSelected={(option, value) => option.nome === value.nome}
      getOptionLabel={(option) => option.nome}
      options={options}
      loading={loading}
      // ref={forwardedRef}
      className={classes.input}
      /* onKeyDown={(e) => {
          if (e.keyCode === 13) handleEnter();
        }} */
      renderInput={(params) => (
        <Box display="flex">
          <InputBase
            {...params}
            color="secondary"
            className={classes.input}
            placeholder={label}
            // autoFocus
            {...params.inputProps}
            ref={params.InputProps.ref}
            inputRef={refAutoComplete}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleEnter();
              if (e.keyCode === 115) {
                handleF4(115);
              }
              if (e.keyCode === 119) {
                handleF4(119);
              }
              if (e.keyCode === 120) {
                handleF4(120);
              }
            }}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={() => handleEnter()}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default forwardRef(AutoCompleteProdutos);

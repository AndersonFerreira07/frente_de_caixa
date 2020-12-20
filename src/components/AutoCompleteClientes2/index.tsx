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
import TextField from '@material-ui/core/TextField';
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
  inputValue: string;
  valueDebounce: string;
  updateValue: (newValue: string) => void;
  label: string;
  handleKey: (code: number) => void;
  resource: string;
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
    inputValue,
    updateValue,
    valueDebounce,
    label,
    handleKey,
    resource,
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

  /*  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]); */

  React.useEffect(() => {
    (async () => {
      if (open) {
        const produtos = await api(query(`${getHost()}/${resource}/search`));
        await sleep(1e3);
        setOptions(produtos.data.data);
      } else {
        setOptions([]);
      }
    })();
  }, [open]);

  React.useEffect(() => {
    (async () => {
      const produtos = await api(query(`${getHost()}/${resource}/search`));
      await sleep(1e3);
      setOptions(produtos.data.data);
    })();
  }, [valueDebounce]);

  console.log('forwardedRef kkkkkkkkkkkkkkkkk');
  console.log(forwardedRef);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
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
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          color="secondary"
          inputRef={forwardedRef}
          onKeyDown={(e) => {
            handleKey(e.keyCode);
          }}
          autoFocus
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default forwardRef(AutoCompleteProdutos);

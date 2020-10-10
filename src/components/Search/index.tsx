import React, { forwardRef } from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useDebounce } from 'use-debounce';

import AutoCompleteProduto from '../AutoCompleteProduto';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      opacity: '0.75',
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

export type SearchProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fullwidth: boolean;
  disabled: boolean;
  searchHandle: () => void;
  searchHandle2: (codigo: string) => void;
  handleF4: (code: number) => void;
};

const Search = forwardRef<any, SearchProps>(
  (
    {
      label,
      value,
      onChange,
      fullwidth,
      disabled = false,
      searchHandle,
      handleF4,
      searchHandle2,
    },
    forwardedRef,
  ) => {
    const classes = useStyles();
    const [valueDebounce] = useDebounce(value, 500);
    const [produto, setProduto] = React.useState<any>(null);

    function keyPress(e) {
      if (e.keyCode === 13) {
        searchHandle();
        setProduto(null);
      }
      if (e.keyCode === 115) {
        handleF4(115);
      }
      if (e.keyCode === 119) {
        handleF4(119);
      }
      if (e.keyCode === 120) {
        handleF4(120);
      }
    }

    function isNumber(valor) {
      if (
        valor === '0' ||
        valor === '1' ||
        valor === '2' ||
        valor === '3' ||
        valor === '4' ||
        valor === '5' ||
        valor === '6' ||
        valor === '7' ||
        valor === '8' ||
        valor === '9'
      ) {
        return true;
      }
      return false;
    }

    function contemNumber() {
      if (value.length > 0) {
        if (isNumber(value[0])) return true;
        return false;
      }
      return false;
    }

    console.log(`valor kkkkk valor :${value}`);
    console.log(`produto kkkkk produto`);
    console.log(produto);

    return (
      <Paper
        component="form"
        className={classes.root}
        onSubmit={(e) => e.preventDefault()}
      >
        {contemNumber() ? (
          <>
            <InputBase
              className={classes.input}
              placeholder={label}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              inputProps={{ 'aria-label': 'Código de barras' }}
              fullWidth={fullwidth}
              disabled={disabled}
              onKeyDown={keyPress}
              inputRef={forwardedRef}
              autoFocus
            />
            <IconButton
              className={classes.iconButton}
              aria-label="search"
              disabled={disabled}
              onClick={() => searchHandle()}
            >
              <SearchIcon />
            </IconButton>
          </>
        ) : (
          <AutoCompleteProduto
            inputValue={value}
            onChange={(produtoNew) => setProduto(produtoNew)}
            updateValue={(newValue) => onChange(newValue)}
            value={produto}
            label={label}
            valueDebounce={valueDebounce}
            handleF4={handleF4}
            handleEnter={() => {
              if (produto) {
                searchHandle2(produto.codigo);
              } else {
                searchHandle2('');
              }
              setProduto(null);
            }}
            ref={forwardedRef}
          />
        )}
      </Paper>
    );
  },
);

export default Search;

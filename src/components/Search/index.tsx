import React, { FC, forwardRef } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

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

export type SearchProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fullwidth: boolean;
  disabled: boolean;
  searchHandle: () => void;
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
    },
    forwardedRef,
  ) => {
    const classes = useStyles();

    function keyPress(e) {
      if (e.keyCode === 13) {
        searchHandle();
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

    return (
      <Paper
        component="form"
        className={classes.root}
        onSubmit={(e) => e.preventDefault()}
      >
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
      </Paper>
    );
  },
);

export default Search;

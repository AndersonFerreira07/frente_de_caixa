import React, { FC } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import {
// makeStyles
// } from '@material-ui/core'

// const useStyles = makeStyles(theme => ({

// }))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // width: 400,
      height: '50px',
      fontSize: '32px',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      textAlign: 'center',
      opacity: '0.75',
    },
  }),
);

export type LabelProps = {
  label: string;
};

const Label: FC<LabelProps> = ({ label }) => {
  const classes = useStyles();

  return <Paper className={classes.root}>{label}</Paper>;
};

export default Label;

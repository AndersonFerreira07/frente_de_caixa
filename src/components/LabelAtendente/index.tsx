import React, { FC } from 'react';

import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '10px',
    backgroundColor: theme.palette.secondary.main,
    // backgroundColor: 'red',
    /* width: '100px',
    height: '100px', */
    /* height: '100%', */
    marginTop: '15px',
    color: 'white',
    boxSizing: 'border-box',
    opacity: '0.75',
  },
  containerOpaco: {
    padding: '10px',
    backgroundColor: theme.palette.secondary.main,
    // backgroundColor: 'red',
    /* width: '100px',
    height: '100px', */
    /* height: '100%', */
    marginTop: '15px',
    color: 'white',
    boxSizing: 'border-box',
  },
  containerInterno: {
    /* width: '100%',
    height: '100%', */
    /* height: '100%', */
    marginTop: '10px',
    fontSize: '20px',
  },
}));

export type LabelAtendenteProps = {
  atendente: string;
  isOpaco?: boolean;
};

const LabelAtendente: FC<LabelAtendenteProps> = ({
  atendente,
  isOpaco = false,
}) => {
  const classes = useStyles();

  return (
    <Paper
      className={isOpaco ? classes.containerOpaco : classes.container}
      elevation={3}
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        /* height="100%" */
        color="white"
      >
        <div>ATENDENTE:</div>

        <Paper className={classes.containerInterno} elevation={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            /* height="100%" */
            height="60px"
            color="black"
          >
            {atendente}
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default LabelAtendente;

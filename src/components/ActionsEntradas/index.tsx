import React, { FC } from 'react';

import { makeStyles, Box, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btn: {
    marginBottom: '10px',
  },
  container: {
    opacity: '0.75',
  },
}));

export type ActionsEntradasProps = {
  onClick: (action: number) => void;
  disabled: boolean[];
  labels: string[];
};

const ActionsEntradas: FC<ActionsEntradasProps> = ({
  onClick,
  disabled,
  labels,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.container}>
      <Box display="flex" flexDirection="column" padding="15px" height="100%">
        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => onClick(0)}
          disabled={disabled[0]}
        >
          {labels[0]}
        </Button>
      </Box>
    </Paper>
  );
};

export default ActionsEntradas;

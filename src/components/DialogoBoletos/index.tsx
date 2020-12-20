import React, {
  useImperativeHandle,
  forwardRef,
  RefForwardingComponent,
} from 'react';

import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export type DialogoBoletosProps = {
  boletos: Array<any>;
};

export type DialogoBoletosHandle = {
  handleOpen: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      backgroundColor: theme.palette.secondary.main,
    },
    root: {
      width: '300px',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const DialogoBoletos: RefForwardingComponent<
  DialogoBoletosHandle,
  DialogoBoletosProps
> = ({ boletos }, ref) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);
    },
  }));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Boletos</DialogTitle>
        <DialogContent dividers style={{ padding: '0' }}>
          <div className={classes.root}>
            <Box
              display={{ xs: 'block', sm: 'flex' }}
              flexDirection="column"
              // marginBottom="30px"
            >
              <List component="nav" aria-label="secondary mailbox folders">
                {boletos.map((item, index) => (
                  <>
                    <ListItemLink href={item} target="_blank">
                      <ListItemText primary={`Boleto ${index + 1}`} />
                    </ListItemLink>
                    <Divider />
                  </>
                ))}
              </List>
            </Box>
          </div>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: 'white' }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default forwardRef(DialogoBoletos);

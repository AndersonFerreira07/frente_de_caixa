import React, {
  useImperativeHandle,
  forwardRef,
  RefForwardingComponent,
  useRef,
} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    // margin: theme.spacing(1),
  },
  withoutLabel: {
    // marginTop: theme.spacing(3),
  },
  textField: {
    // width: '25ch',
  },
}));

export type DialogoNotaProps = {
  handleClose: (senha: string) => void;
};

export type DialogoNotaHandle = {
  handleOpen: () => void;
};

const DialogoNota: RefForwardingComponent<
  DialogoNotaHandle,
  DialogoNotaProps
> = (props, ref) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const refBtn = useRef<any>(null);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
    setPassword('');
    props.handleClose(password);
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
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="form-dialog-title">
          Autorizar edição do preço unitário
        </DialogTitle>
        <DialogContent>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              fullWidth
              autoFocus
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  if (refBtn.current) refBtn.current.click();
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" ref={refBtn}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default forwardRef(DialogoNota);

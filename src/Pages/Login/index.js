import React, { FC, useState } from 'react';
import { Field, withTypes } from 'react-final-form';
import { useHistory, Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import { useSnackbar } from 'notistack';

import {
  login,
  setCargo,
  setUsername,
  setCargoObj,
  setUserId,
  isAuthenticated,
} from '../../services/alth';
import api from '../../services/api';
import InputAdorments2 from './InputPassaword';
import InputUsername from './InputUsername';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'url(https://source.unsplash.com/random/1600x900)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  card: {
    minWidth: 300,
    marginTop: '6em',
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  hint: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[500],
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    marginTop: '1em',
  },
  actions: {
    padding: '0 1em 1em 1em',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const { Form } = withTypes();

// export type LoginProps = {};

// const Login: FC<LoginProps> = ({}) => {
const LoginTela = ({}) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(auth) {
    setLoading(true);
    try {
      const dataUsuario = await api.post('/login', auth);

      const {
        token,
        refreshToken,
        cargo,
        username,
        cargoObj,
        user_id,
      } = dataUsuario.data;

      console.log('USER DATA');
      console.log(dataUsuario.data);

      login(token, refreshToken);
      setCargo(cargo);
      setUsername(username);
      setCargoObj(cargoObj);
      setUserId(user_id);

      history.push('/');
    } catch (error) {
      enqueueSnackbar('Usuário ou senha incorretos!');
    }
    setLoading(false);

    /* const {
      token,
      refreshToken,
      cargo,
      username,
      cargoObj,
      user_id,
    } = dataUsuario.data;
    login(token, refreshToken);
    setCargo(cargo);
    setUsername(username);
    setCargoObj(cargoObj);
    setUserId(user_id);
    enqueueSnackbar('Usuáriou ou senha incorretos!'); */
    // history.push('/');
  }

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'É necessário fornecer o nome de usuário!';
    }
    if (!values.password) {
      errors.password = 'É necessário fornecer a senha do usuário!';
    }
    return errors;
  };

  return (
    <>
      {isAuthenticated() ? (
        <Redirect to="/" />
      ) : (
        <Form
          onSubmit={handleSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <div className={classes.main}>
                <Card className={classes.card}>
                  <div className={classes.avatar}>
                    <Avatar className={classes.icon}>
                      <LockIcon />
                    </Avatar>
                  </div>
                  <div className={classes.hint}>CARUARU FRIOS</div>
                  <div className={classes.form}>
                    <div className={classes.input}>
                      <Field
                        autoFocus
                        name="username"
                        component={InputUsername}
                        label="Usuário"
                        disabled={loading}
                      />
                    </div>
                    <div className={classes.input}>
                      <Field
                        name="password"
                        component={InputAdorments2}
                        label="Senha"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <CardActions className={classes.actions}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="secondary"
                      disabled={loading}
                      fullWidth
                    >
                      {loading && (
                        <CircularProgress
                          size={25}
                          thickness={2}
                          color="secondary"
                          style={{ marginRight: '10px' }}
                        />
                      )}
                      Entrar
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </form>
          )}
        />
      )}
    </>
  );
};

export default LoginTela;

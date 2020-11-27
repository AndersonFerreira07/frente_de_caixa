import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Paper } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import ActionsEntrada from '../../components/ActionsEntradas';
import Label from '../../components/Label';
import api from '../../services/api';
import { getCaixaId, setCaixaId } from '../../services/config';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  opcoes: {
    opacity: '0.75',
    height: '100%',
    padding: '20px',
  },
  opcoes2: {
    height: '100%',
  },
}));

export type ConfigProps = {};

const Config: FC<ConfigProps> = () => {
  const [options, setOptions]: Array<any> = useState([]);
  const [select, setSelect]: any = useState(-1);
  const [selectAntigo, setSelectAntigo]: any = useState(-1);
  const classes = useStyles();

  const history = useHistory();
  useEffect(() => {
    async function getData() {
      const itens: Array<any> = [];
      const dataCaixas = await api.get('/caixasfisicos/todos');
      for (let i = 0; i < dataCaixas.data.length; i += 1) {
        itens.push({
          id: dataCaixas.data[i].id,
          nome: dataCaixas.data[i].nome,
        });
      }
      setOptions(itens);
    }
    setSelectAntigo(getCaixaId() !== null ? getCaixaId() : -1);
    setSelect(getCaixaId() !== null ? getCaixaId() : -1);
    getData();
  }, []);
  function irParaTelaInit() {
    history.push('/');
  }
  function salvarConfiguracoes() {
    if (select > 0) setCaixaId(select);
  }
  const handleChange = (event) => {
    setSelect(parseInt(event.target.value, 10));
  };
  return (
    <>
      <Box margin="10px">
        <Box margin="0px 0px 10px">
          <Label label="Configurações" />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        padding="10px"
        className={classes.opcoes2}
      >
        <Box flex={1.5} display="flex" flexDirection="column">
          <ActionsEntrada
            labels={[select !== selectAntigo ? 'Salvar' : 'Voltar']}
            // disabled={[!(select !== selectAntigo)]}
            disabled={[false]}
            onClick={(action) => {
              switch (action) {
                case 0:
                  if (select !== selectAntigo) salvarConfiguracoes();
                  irParaTelaInit();
                  break;
                default:
                  break;
              }
            }}
          />
        </Box>
        <Box padding="0 10px" flex={4} className={classes.opcoes2}>
          <Paper elevation={3} className={classes.opcoes}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Caixa
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={select}
                onChange={handleChange}
                label="Caixa"
              >
                {options.map((item) => (
                  <MenuItem value={item.id}>{item.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Box>
        <Box
          flex={2}
          display="flex"
          flexDirection="column"
          /* justifyContent="space-between" */
        />
      </Box>
    </>
  );
};

export default Config;

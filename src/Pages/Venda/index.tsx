import React, { FC, createContext, useReducer, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Row } from '../../components/Table2';
import { Row as RowParcelas } from '../../components/TableTiposPagamento';
import api from '../../services/api';
import FinalizarVenda from '../FinalizarVenda';
import Frente from '../Frente';
import reducer from './reducer';

export type VendaType = {
  itens: Array<Row>;
  parcelas: Array<RowParcelas>;
  cliente: any;
  subTotal: number;
};

export type VendaContextType = {
  venda: VendaType;
  dispatch: (data: any) => void;
};

export const VendaContext = createContext<VendaContextType>({
  venda: {
    cliente: null,
    itens: [],
    parcelas: [],
    subTotal: 0,
  },
  dispatch: (data: any) => {
    console.log('dispach velho');
  },
});

export type VendaProps = {};

const Venda: FC<VendaProps> = () => {
  const [venda, dispatch] = useReducer(reducer, {
    cliente: null,
    itens: [],
    parcelas: [],
  });
  const { path } = useRouteMatch();
  console.log('frente caixa rota kkk');

  useEffect(() => {
    async function getDefaults() {
      const dataConfig = await api.get('/config2');
      const dataClientes = await api.get(
        `/clientes/${dataConfig.data.cliente_id}`,
      );

      dispatch({ type: 'UPDATE_CLIENTE', cliente: dataClientes.data });
    }
    getDefaults();
  }, []);

  return (
    <VendaContext.Provider value={{ venda, dispatch }}>
      <Switch>
        <Route path={`${path}/frentedecaixa`} component={Frente} />
        <Route path={`${path}/finalizarvenda`} component={FinalizarVenda} />
      </Switch>
    </VendaContext.Provider>
  );
};

export default Venda;

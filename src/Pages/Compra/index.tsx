import React, { FC, createContext, useReducer, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Row } from '../../components/Table2';
import { Row as RowParcelas } from '../../components/TableParcelasCompra';
import api from '../../services/api';
import FinalizarCompra from '../FinalizarCompra';
import FrenteCompra from '../FrenteCompra';
import reducer from './reducer';

export type CompraType = {
  itens: Array<Row>;
  parcelas: Array<RowParcelas>;
  fornecedor: any;
  subTotal: number;
};

export type CompraContextType = {
  compra: CompraType;
  dispatch: (data: any) => void;
};

export const CompraContext = createContext<CompraContextType>({
  compra: {
    fornecedor: null,
    itens: [],
    parcelas: [],
    subTotal: 0,
  },
  dispatch: (data: any) => {
    console.log('dispach velho');
  },
});

export type CompraProps = {};

const Compra: FC<CompraProps> = () => {
  const [compra, dispatch] = useReducer(reducer, {
    fornecedor: null,
    itens: [],
    parcelas: [],
  });
  const { path } = useRouteMatch();
  console.log('frente caixa rota kkk');

  useEffect(() => {
    async function getDefaults() {
      const dataConfig = await api.get('/config2');
      const dataFornecedores = await api.get(
        `/fornecedores/${dataConfig.data.fornecedor_id}`,
      );

      dispatch({
        type: 'UPDATE_FORNECEDOR',
        fornecedor: dataFornecedores.data,
      });
    }
    getDefaults();
  }, []);

  return (
    <CompraContext.Provider value={{ compra, dispatch }}>
      <Switch>
        <Route path={`${path}/frentedecaixa`} component={FrenteCompra} />
        <Route path={`${path}/finalizarcompra`} component={FinalizarCompra} />
      </Switch>
    </CompraContext.Provider>
  );
};

export default Compra;

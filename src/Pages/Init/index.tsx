import React, { FC, useState, useEffect, useRef } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useHistory } from 'react-router-dom';

import { Box } from '@material-ui/core';

import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import DialogoTroco from '../../components/DialogoTrocoInicial';
import EmptyBackground from '../../components/EmptyBackground';
import Footer from '../../components/Footer';
import LabelSemAtendente from '../../components/LabelSemAtendente';
import { getUsername, logout } from '../../services/alth';

export type InitProps = {};

const Init: FC<InitProps> = () => {
  const [atendente, setAtendente] = useState('');
  const history = useHistory();

  /* type CountdownHandle = React.ElementRef<typeof DialogoConfirmacao>;
  const dialogoConfirmacaoRef = useRef<CountdownHandle>(null); */

  type CountdownHandle2 = React.ElementRef<typeof DialogoTroco>;
  const dialogoTrocoRef = useRef<CountdownHandle2>(null);

  /* function handleConfirma(codigo: number) {
    switch (codigo) {
      case 2:
        logout();
        history.push('/login');
        break;
      default:
        break;
    }
  } */

  async function getAtendente() {
    const username = getUsername();
    setAtendente(username || '');
  }

  useEffect(() => {
    getAtendente();
  }, []);

  useEffect(() => {
    if (dialogoTrocoRef.current) {
      dialogoTrocoRef.current.handleOpen();
    }
  }, []);

  return (
    <>
      <Box margin="10px" />
      <Box display="flex" justifyContent="space-between" padding="10px">
        {atendente !== '' && (
          <Box flex={6}>
            <div style={{ height: '100% ' }}>
              <EmptyBackground />
            </div>
          </Box>
        )}
      </Box>
      <Box margin="10px">
        {atendente !== '' ? (
          <Footer tela={1} disabledPartes={false} />
        ) : (
          <LabelSemAtendente />
        )}
      </Box>
      {/* <DialogoConfirmacao
        ref={dialogoConfirmacaoRef}
        handleConfirma={handleConfirma}
      /> */}
      <DialogoTroco ref={dialogoTrocoRef} />
      {atendente !== '' && (
        <KeyboardEventHandler
          handleKeys={[
            'f2',
            'f4',
            'f5',
            'f7',
            'f8',
            'f9',
            'f10',
            'f3',
            'ctrl+f2',
            'ctrl+f3',
            // 'delete',
            'insert',
          ]}
          onKeyEvent={(key, e) => {
            switch (key) {
              case 'f2':
                history.push('/vendas/frentedecaixa');
                break;
              case 'f4':
                history.push('/entradas');
                break;
              case 'f7':
                history.push('/transferencias');
                break;
              case 'f8':
                history.push('/relatorio');
                break;
              /* case 'f9':
                history.push('/configuracoes');
                break; */
              case 'f9':
                history.push('/saidas');
                break;

              case 'f10':
                history.push('/listavendas');
                break;
              case 'ctrl+f2':
                history.push('/pagamentos');
                break;
              case 'ctrl+f3':
                history.push('/pagamentos');
                break;
              /* case 'delete':
                if (dialogoConfirmacaoRef.current)
                  dialogoConfirmacaoRef.current.handleOpen(
                    'Logout',
                    'Tem certeza que deseja deslogar!',
                    2,
                  );
                break; */
              default:
                break;
            }
          }}
        />
      )}
    </>
  );
};

export default Init;

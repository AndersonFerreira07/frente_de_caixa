const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_SALDO_CAIXA':
      return {
        ...state,
        saldoCaixa: action.saldoCaixa,
      };
    default:
      return state;
  }
};

export default reducer;

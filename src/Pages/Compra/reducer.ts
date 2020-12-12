function getSubTotal(itens) {
  let soma = 0;
  for (let i = 0; i < itens.length; i += 1) {
    soma += itens[i].total;
  }
  return soma;
}

function renameItensUIDD(itens) {
  const arrayNew = itens.slice();
  for (let i = 0; i < itens.length; i += 1) {
    arrayNew[i].uidd = `${arrayNew[i].conta.nome}${i}`;
  }
  return arrayNew;
}

const reducer = (state: any, action: any) => {
  let arrayNew = state.itens.slice();
  let arrayNewParcelas = state.parcelas.slice();
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        itens: [...arrayNew, action.item],
        subTotal: getSubTotal([...arrayNew, action.item]),
      };
    case 'REMOVE_ITEM':
      for (let i = 0; i < action.indices.length; i += 1) {
        arrayNew = arrayNew.filter((obj) => obj.uidd !== action.indices[i]);
      }
      return {
        ...state,
        itens: [...arrayNew],
        subTotal: getSubTotal([...arrayNew]),
      };
    case 'UPDATE_ITEM':
      arrayNew[action.position] = action.item;
      return {
        ...state,
        itens: [...arrayNew],
        subTotal: getSubTotal([...arrayNew]),
      };
    case 'UPDATE_FORNECEDOR':
      return {
        ...state,
        fornecedor: action.fornecedor,
      };

    case 'ADD_PARCELA':
      return {
        ...state,
        parcelas: [...arrayNewParcelas, action.item],
      };
    case 'REMOVE_PARCELA':
      for (let i = 0; i < action.indices.length; i += 1) {
        arrayNewParcelas = arrayNewParcelas.filter(
          (obj) => obj.uidd !== action.indices[i],
        );
      }
      return {
        ...state,
        parcelas: [...renameItensUIDD(arrayNewParcelas)],
      };
    default:
      return state;
  }
};

export default reducer;

export const CAIXA_ID = '@CaixaId';

export const getCaixaId = () => {
  // const caixaId = String(localStorage.getItem(CAIXA_ID));
  const caixaId = localStorage.getItem(CAIXA_ID);
  console.log('localStorage.getItem(CAIXA_ID)');
  console.log(localStorage.getItem(CAIXA_ID));

  return caixaId ? parseInt(caixaId, 10) : null;
};

export const setCaixaId = (caixaId) =>
  localStorage.setItem(CAIXA_ID, String(caixaId));

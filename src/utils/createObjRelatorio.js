import moment from 'moment';

function formatData(data) {
    return moment(data).format('DD/MM/YYYY')
}

export function createObjRelatorio(reportObj) {
    const reportObjNew = reportObj;

    for(let i = 0; i < reportObjNew.length; i++) {

        for(let j = 0; j < reportObjNew[i].entradas.length; j++) {
            reportObjNew[i].entradas[j].data = formatData(reportObjNew[i].entradas[j].data)
        }

        for(let j = 0; j < reportObjNew[i].custos.length; j++) {
            reportObjNew[i].custos[j].data = formatData(reportObjNew[i].custos[j].data)
        }

        for(let j = 0; j < reportObjNew[i].vendas.length; j++) {
            reportObjNew[i].vendas[j].datapagamento = formatData(reportObjNew[i].vendas[j].datapagamento)
            reportObjNew[i].vendas[j].datapagamentoreal = formatData(reportObjNew[i].vendas[j].datapagamentoreal)
        }

        for(let j = 0; j < reportObjNew[i].compras.length; j++) {
            reportObjNew[i].compras[j].data = formatData(reportObjNew[i].compras[j].data)
            reportObjNew[i].compras[j].datapagamento = formatData(reportObjNew[i].compras[j].datapagamento)
            reportObjNew[i].compras[j].datapagamentoreal = formatData(reportObjNew[i].compras[j].datapagamentoreal)
        }

    }

    return reportObjNew
}

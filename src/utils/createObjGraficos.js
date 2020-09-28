export function createObjVendasTipoPagamentos(data) {
    const valorTotal = []
    const valorAVista = []
    const valorAPrazo = []
    const valorFaltaPagar = []
    const valorPago = []
    const meta = []

    for(let i = 0; i < 12; i++) {
        valorTotal.push(data[i].valorTotal)
        valorAVista.push(data[i].valorAVista)
        valorAPrazo.push(data[i].valorAPrazo)
        valorFaltaPagar.push(data[i].valorFaltaPagar)
        valorPago.push(data[i].valorPago)
        meta.push(data[i].meta)
    }

    return [
        {
            label: 'Total',
            color: 'rgba(75, 192, 192, 1)',
            data: valorTotal
        },
        {
            label: 'Meta',
            color: 'yellow',
            data: meta
        },
        {
            label: 'À Vista',
            color: 'green',
            data: valorAVista
        },
        {
            label: 'À Prazo',
            color: 'red',
            data: valorAPrazo
        },
        {
            label: 'Falta Pagar',
            color: 'black',
            data: valorFaltaPagar
        },
    ]
}

export function createObjPesos(data) {
    const pesoVendido = []
    const pesoComprado = []

    for(let i = 0; i < 12; i++) {
        pesoVendido.push(data[i].pesoVendido)
        pesoComprado.push(data[i].pesoComprado)
    }

    return [
        {
            label: 'Peso Vendido',
            color: 'green',
            data: pesoVendido
        },
        {
            label: 'Peso Comprado',
            color: 'red',
            data: pesoComprado
        }
    ]
}

export function createObjVolumes(data) {
    const volumeVendido = []
    const volumeComprado = []

    for(let i = 0; i < 12; i++) {
        volumeVendido.push(data[i].volumeVendido)
        volumeComprado.push(data[i].volumeComprado)
    }

    return [
        {
            label: 'Volume Vendido',
            color: 'green',
            data: volumeVendido
        },
        {
            label: 'Volume Comprado',
            color: 'red',
            data: volumeComprado
        }
    ]
}

export function createObjVendasCustos(data) {
    const vendas = []
    const custos = []

    for(let i = 0; i < 12; i++) {
        vendas.push(data[i].vendas)
        custos.push(data[i].custos)
    }

    return [
        {
            label: 'Vendas',
            color: 'green',
            data: vendas
        },
        {
            label: 'Custos',
            color: 'red',
            data: custos
        }
    ]
}

export function createObjLucroCustos(data) {
    const lucroAparente = []
    const lucroReal = []
    const custos = []

    for(let i = 0; i < 12; i++) {
        lucroAparente.push(data[i].lucroAparcente)
        lucroReal.push(data[i].lucroReal)
        custos.push(data[i].custos)
    }

    return [
        {
            label: 'Lucro Aparente',
            color: 'green',
            data: lucroAparente
        },
        {
            label: 'Lucro Real',
            color: 'yellow',
            data: lucroReal
        },
        {
            label: 'Despezas Gerais',
            color: 'red',
            data: custos
        }
    ]
}

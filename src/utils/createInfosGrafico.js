function getLabelsMeses() {
    return [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
    ]
}

function getItemDataset(label, color, data) {
    return {
        label,
        data,
        fill: false,
        borderColor: color,
        backgroundColor: color,
    }
}

function getData(datasets1) {
    const datasets = []
    for(let i = 0; i < datasets1.length; i++) {
        const { label, color, data } = datasets1[i]
        datasets.push(getItemDataset(label, color, data))
    }
    return {
        labels: getLabelsMeses(),
        datasets
    }
}

function getOptions(text) {
    return {
        title: {
            display: true,
            text,
            fontColor: 'red',
            fontSize: 14,
        },
    }
}

export function getInfos(label, datasets) {
    return {
        data: getData(datasets),
        options: getOptions(label)
    }
}

export const legend = {
    display: true,
    position: 'bottom',
    labels: {
        fontColor: '#323130',
        fontSize: 14,
    },
};

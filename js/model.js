let data = {
    selectedProgram: 0.1,
    cost: 12000000,
    minPrice: 375000,
    maxPrice: 100000000,
    getDownPayment: function (rate) {
        return rate*this.cost
    },
    rate: 0.15,
    minPaymentRate: 0.15,
    maxPaymentRate: 0.9,
    downPaymentValue: 1800000,
    duration: 1,
    minDuration: 1,
    maxDuration: 30,
    programs: {
        base: 0.1,
        it: 0.047,
        gov: 0.067,
        zero: 0.12
    }
}

let results = {
    rate: data.selectedProgram
}

function getData () {
    return {...data}
}

function getResults () {
    return {...results}
}

function setData (newData) {
    
    console.log('NEW DATA start', newData)

    if (newData.onUpdate === 'radioProgram') {
        newData.id === 'zero-value' ? newData.minPaymentRate = 0 : newData.minPaymentRate = 0.15
    }

    if (newData.onUpdate === 'inputCost') {
        if (newData.cost > data.maxPrice) newData.cost = 400000
        if (newData.cost < data.minPrice) newData.cost = 400000 
    }
   
    data = {
        ...data,
        ...newData
    }

    const months = data.duration * 12
    const monthRate = data.rate / 12
    const overallRate = (1 + monthRate) ** months
    const pureDebtValue = data.cost - data.cost*data.rate
    const monthlyPayment = Math.floor((pureDebtValue * monthRate * overallRate) / (overallRate - 1))
    
    const overPayment = monthlyPayment * months - pureDebtValue
    console.log(months, monthRate, overPayment, pureDebtValue, monthlyPayment)
    console.log(data.downPaymentValue)
    results = {
        rate: data.selectedProgram,
        monthlyPayment,
        pureDebtValue,
        overPayment
    }

    console.log('DATA AFTER UPD', data)
}

export {getData, setData, getResults}


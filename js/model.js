let data = {
    selectedProgram: 0.1,
    cost: 12000000,
    minPrice: 375000,
    maxPrice: 100000000,
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
    
    console.log(newData)
    if (newData.onUpdate === 'inputCost') {
        if (newData.cost > data.maxPrice) newData.cost = 400000
        if (newData.cost < data.minPrice) newData.cost = 400000 
    }
   
    data = {
        ...data,
        ...newData
    }

    results = {
        rate: data.selectedProgram
    }

    console.log(data);
}

export {getData, setData, getResults}


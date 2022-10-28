import updateModel from "../utils/updateModel.js"

function init (getData) {
    const input = document.querySelector('#input-downpayment')
    const data = getData()

    data.rate *=100
    const settings = {
        numeral: true,
        prefix: '%',
        tailPrefix: true,
        numeralIntegerScale: 2,   
    }

    const min = (data.minPaymentRate * 100)
    const max = (data.maxPaymentRate * 100)

    const cleaveInput = new Cleave(input, settings)
    cleaveInput.setRawValue(data.rate)

    input.addEventListener('input', function () {
        const value = +cleaveInput.getRawValue().split('%')[0]
        
        if (value < min  || value > max) {
            input.closest('.param__details').classList.add('param__details--error')
        }

        if (value >= min && value <= max) {     
            input.closest('.param__details').classList.remove('param__details--error')
        }
    })

    input.addEventListener('change', function () {
    
        const value = +cleaveInput.getRawValue()

        if (value < min) {
            cleaveInput.setRawValue(data.minPaymentRate)
        } 

        if (value > min) {
            cleaveInput.setRawValue(data.maxPaymentRate)
        }
        
        //Update model
        input.closest('.param__details').classList.remove('param__details--error')
        updateModel(input, {rate: +cleaveInput.getRawValue().split('%')[0]/100, onUpdate: 'inputRate'})
    })

    return (cleaveInput)

}

export default init
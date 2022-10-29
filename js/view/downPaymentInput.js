import updateModel from "../utils/updateModel.js"

function init (getData) {
    const input = document.querySelector('#input-downpayment')
    const data = getData()

    const min = data.getDownPayment(data.minPaymentRate)
    const max = data.getDownPayment(data.maxPaymentRate)
    const downPayment = data.downPaymentValue

    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' '
    }
 
    const cleaveInput = new Cleave(input, settings)
    cleaveInput.setRawValue(downPayment)

    input.addEventListener('input', function () {
        const value = +cleaveInput.getRawValue()

        if (value < min || value > max) {
            input.closest('.param__details').classList.add('param__details--error')
        }

        if (value >= min && value <= max) {     
            input.closest('.param__details').classList.remove('param__details--error')
        }
    })

    input.addEventListener('change', function () {
        const value = +cleaveInput.getRawValue()

        if (value < min) {
            cleaveInput.setRawValue(data.getDownPayment(data.minPaymentRate))
        } 

        if (value > max) {
            cleaveInput.setRawValue(data.getDownPayment(data.maxPaymentRate))
        }

        input.closest('.param__details').classList.remove('param__details--error')

        //Update model
        const newDownPayment = +cleaveInput.getRawValue()
        updateModel(input, {
            downPaymentValue: newDownPayment, 
            rate: Math.round(10*newDownPayment/data.cost)/10,
            onUpdate: 'inputRate'})
    })
    return (cleaveInput)
}

export default init
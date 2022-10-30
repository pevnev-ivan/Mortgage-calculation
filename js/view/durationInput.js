import updateModel from "../utils/updateModel.js"

function init (getData) {
    const input = document.querySelector('#input-term')
    const data = getData()

    const settings = {
        numeral: true,
        delimiter: ' '
    }

    const cleaveInput = new Cleave(input, settings)
    cleaveInput.setRawValue(data.duration)

    input.addEventListener('input', function () {
        const value = +cleaveInput.getRawValue()

        if (value < data.minDuration || value > data.maxDuration) {
            input.closest('.param__details').classList.add('param__details--error')
        }

        if (value >= data.minDuration && value <= data.maxDuration) {
            input.closest('.param__details').classList.remove('param__details--error')
        }

        updateModel(input, {duration: +cleaveInput.getRawValue(), onUpdate: 'inputCost'})
    })

    input.addEventListener('change', function () {

        const value = +cleaveInput.getRawValue()

        if (value < data.minDuration) {
            cleaveInput.setRawValue(data.minDuration)
        }

        if (value > data.maxDuration) {
            cleaveInput.setRawValue(data.maxDuration)
        }

        //Update model
        input.closest('.param__details').classList.remove('param__details--error')
        updateModel(input, {duration: +cleaveInput.getRawValue(), onUpdate: 'durationInput'})
    })

    return (cleaveInput)

}

export default init
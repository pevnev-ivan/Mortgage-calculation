function init (getData) {
    const input = document.querySelector('#input-cost')
    const data = getData()

    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' '
    }

    const cleaveInput = new Cleave(input, settings)
    cleaveInput.setRawValue(data.cost)

    input.addEventListener('input', function () {
        const value = +cleaveInput.getRawValue()

        if (value < data.minPrice || value > data.maxPrice) {
            input.closest('.param__details').classList.add('param__details--error')
        }

        if (value >= data.minPrice && value <= data.maxPrice) {
            input.closest('.param__details').classList.remove('param__details--error')
        }
    })

    input.addEventListener('change', function () {
        const value = +cleaveInput.getRawValue()

        if (value < data.minPrice) {
            cleaveInput.setRawValue(data.minPrice)
            input.closest('.param__details').classList.remove('param__details--error')
        } 

        if (value > data.maxPrice) {
            cleaveInput.setRawValue(data.maxPrice)
            input.closest('.param__details').classList.remove('param__details--error')
        } 
    })

}

export default init
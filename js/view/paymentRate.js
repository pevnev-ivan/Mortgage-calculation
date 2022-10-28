import updateModel from '../utils/updateModel.js'

function init (getData) {

const slider = document.querySelector('#slider-downpayment')
const data = getData()
const minRate = data.minPaymentRate
const maxRate = data.maxPaymentRate

noUiSlider.create(slider, {
    start: minRate,
    connect: 'lower',
    tooltips: true,
    step: 0.01,
    range: {
        min: minRate,
        max: maxRate,
        },
        format: wNumb ({
            encoder: function( value ){
                return Math.round(value * 100);
            },
            suffix: '%'
        })
})

slider.noUiSlider.on('slide', function () {

    let sliderValue = slider.noUiSlider.get().replace(/%/g, '')
    sliderValue = parseInt(sliderValue) / 100

    let newData = {rate: sliderValue, onUpdate: 'sliderRate'}
    updateModel(slider, newData)

})
return (slider)
}

export default init
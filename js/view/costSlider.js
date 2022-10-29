import updateModel from '../utils/updateModel.js'

function init (getData) {

const slider = document.querySelector('#slider-cost')
const data = getData()
const cost = data.cost
const minCost = data.minPrice
const maxCost = data.maxPrice

noUiSlider.create(slider, {
    start: cost,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        min: minCost,
        '1%': [400000, 100000],
        '50%': [10000000, 500000],
         max: maxCost,
        },
        format: wNumb ({
            decimals: 0,
            thousand: ' ',
            suffix: '', 
        })
})

slider.noUiSlider.on('slide', function () {
    let sliderValue = slider.noUiSlider.get().replace(/ /g, '')
    sliderValue = parseInt(sliderValue)

    //Update model
    let newData = {cost: sliderValue, onUpdate: 'updateSliderCost'}
    updateModel(slider, newData)
})
return (slider)
}

export default init
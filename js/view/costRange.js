import updateModel from './../utils/updateModel.js'

function init (getData) {
console.log('Cost Range');

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

    let silderValue = slider.noUiSlider.get().replace(/ /g, '')
   
    silderValue = parseInt(silderValue)
    console.log(silderValue)
    let newData = {cost: silderValue, onUpdate: 'updateSliderCost'}
    updateModel(slider, newData)
})


}

export default init
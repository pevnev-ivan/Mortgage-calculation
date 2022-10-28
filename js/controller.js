import * as model from './model.js'
import programs from '../js/view/radioPrograms.js'
import updateResultsView from './view/updateResultsView.js'
import updateMinPaymentRate from './utils/updateMinPaymentRate.js'

import costInput from './view/costInput.js'
import costRange from './view/costRange.js'

import rateInput from './view/rateInput.js'
import rateRange from './view/paymentRate.js'

window.onload = function () {
    const getData = model.getData

    // Init programs
    programs(getData)
    const sliderCost = costRange(getData)
    const inputCost = costInput(getData)
    const sliderRate = rateRange(getData)
    const inputRate = rateInput(getData)


    document.addEventListener('updateForm', (e) => {
        
        model.setData(e.detail)

        const data = model.getData()
        const results = model.getResults()
        
        updateFormsAndSliders(data)
        updateResultsView(results)
    })

    function updateFormsAndSliders (data) {
        
        if (data.onUpdate === 'inputRate') {
            sliderRate.noUiSlider.set(data.rate)
        }

        if (data.onUpdate === 'sliderRate') {
            inputRate.setRawValue(Math.round(data.rate*100))
        }

        if (data.onUpdate === 'radioProgram') {
            updateMinPaymentRate(data.minPaymentRate)
        }

        if (data.onUpdate !== 'updateSliderCost') {
            sliderCost.noUiSlider.set(data.cost)
        }

        if (data.onUpdate !== 'inputCost') {
            inputCost.setRawValue(data.cost)
        }
        
    } 

}
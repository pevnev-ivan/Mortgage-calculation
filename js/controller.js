import * as model from './model.js'
import programs from '../js/view/radioPrograms.js'
import updateResultsView from './view/updateResultsView.js'
import updateMinPaymentRate from './utils/updateMinPaymentRate.js'

import costInput from './view/costInput.js'
import costSlider from './view/costSlider.js'

import downPaymentInput from './view/downPaymentInput.js'
import downPaymentSlider from './view/downPaymentSlider.js'
import durationInput from './view/durationInput.js'

window.onload = function () {
    // Init programs
    const getData = model.getData
    programs(getData)

    const sliderCost = costSlider(getData)
    const inputCost = costInput(getData)

    const sliderDownPayment = downPaymentSlider(getData)
    const inputDownPayment = downPaymentInput(getData)

    const inputDuration = durationInput(getData)

    document.addEventListener('updateForm', (e) => {
        model.setData(e.detail)

        const data = model.getData()
        const results = model.getResults()
        
        updateFormsAndSliders(data)
        updateResultsView(results)
    })

    function updateFormsAndSliders (data) {





        if (data.onUpdate === 'updateSliderCost' || data.onUpdate === 'inputCost') {
            if (data.downPaymentValue < data.getDownPayment(data.minPaymentRate) ||
                data.downPaymentValue > data.getDownPayment(data.minPaymentRate)) {
                inputDownPayment.setRawValue(Math.round(data.getDownPayment(data.rate)))
            }
        }
        
        if (data.onUpdate === 'inputRate') {
            sliderDownPayment.noUiSlider.set(data.rate)
        }

        if (data.onUpdate === 'sliderRate') {
            inputDownPayment.setRawValue(Math.round(data.getDownPayment(data.rate)))
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
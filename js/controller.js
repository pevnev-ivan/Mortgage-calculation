import * as model from './model.js'
import programs from '../js/view/radioPrograms.js'
import updateResultsView from './view/updateResultsView.js'


import costInput from './view/costInput.js'
import costRange from './view/costRange.js'

window.onload = function () {
    const getData = model.getData

    // Init programs
    programs(getData)
    costRange(getData)
    costInput(getData)

    document.addEventListener('updateForm', (e) => {
        
        model.setData(e.detail)

        const data = model.getData()
        const results = model.getResults()
        
        updateFormsAndSliders(data)
        

        updateResultsView(results)
    })

    function updateFormsAndSliders (data) {
        if (data.onUpdate !== 'inputCost') {

        }

        if (data.onUpdate !== 'updateSliderCost') {
            
        }
    } 

}
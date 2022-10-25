import * as model from './model.js'
import programs from '../js/view/radioPrograms.js'
import updateResultsView from './view/updateResultsView.js'

import costInput from './view/costInput.js'

window.onload = function () {
    const getData = model.getData

    // Init programs
    programs(getData)

    document.addEventListener('updateForm', (e) => {
        
        model.setData(e.detail)

        const data = model.getData()
        const results = model.getResults()
       
        costInput(getData)
        updateResultsView(results)
    })


}
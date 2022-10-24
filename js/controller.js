import * as model from './model.js'
import programs from '../js/view/radioPrograms.js'

window.onload = function () {
    const getData = model.getData

    // Init programs
    programs(getData)

    document.addEventListener('updateForm', (e) => {
        model.setData(e.detail)
    })


}
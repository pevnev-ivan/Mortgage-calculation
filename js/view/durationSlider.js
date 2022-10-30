import updateModel from '../utils/updateModel.js'

function init (getData) {

    const slider = document.querySelector('#slider-term')
    const data = getData()
    const minDuration = data.minDuration
    const maxDuration = data.maxDuration

    noUiSlider.create(slider, {
        start: minDuration,
        connect: 'lower',
        tooltips: true,
        step: 1,
        range: {
            min: minDuration,
            max: maxDuration,
        },
        format: wNumb ({
            decimals: 0,
            thousand: ' ',
            suffix: '',
        })
    })

    slider.noUiSlider.on('slide', function () {

        let sliderValue = slider.noUiSlider.get()

        let newData = {duration: sliderValue, onUpdate: 'sliderDuration'}
        updateModel(slider, newData)

    })
    return (slider)
}

export default init
import * as model from './model.js'
import programs from '../js/view/radioPrograms.js'
import updateResultsView from './view/updateResultsView.js'
import updateMinPaymentRate from './utils/updateMinPaymentRate.js'

import costInput from './view/costInput.js'
import costSlider from './view/costSlider.js'

import downPaymentInput from './view/downPaymentInput.js'
import downPaymentSlider from './view/downPaymentSlider.js'
import durationInput from './view/durationInput.js'
import durationSlider from "./view/durationSlider.js";

window.onload = function () {
    // Init programs
    const getData = model.getData
    programs(getData)

    const sliderCost = costSlider(getData)
    const inputCost = costInput(getData)

    const sliderDownPayment = downPaymentSlider(getData)
    const inputDownPayment = downPaymentInput(getData)

    const inputDuration = durationInput(getData)
    const sliderDuration = durationSlider(getData)
    
    //  Данные для первой отрисовки результатов
    model.setData({})
    const results = model.getResults()
    updateResultsView(results)

    document.addEventListener('updateForm', (e) => {
        model.setData(e.detail)

        const data = model.getData()
        const results = model.getResults()

        
        updateFormsAndSliders(data)
        updateResultsView(results)
    })

    function updateFormsAndSliders (data) {

        if (data.onUpdate === 'sliderDuration') {
            inputDuration.setRawValue(data.duration)
        }

        if (data.onUpdate === 'durationInput') {
            sliderDuration.noUiSlider.set(data.duration)
        }

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

            sliderDownPayment.noUiSlider.updateOptions({
                range: {
                    min: data.minPaymentRate,
                    max: data.maxPaymentRate
                }
            })
            inputDownPayment.setRawValue(Math.round(data.getDownPayment(data.minPaymentRate)))
            sliderDownPayment.noUiSlider.set(data.minPaymentRate)
        }

        if (data.onUpdate !== 'updateSliderCost') {
            sliderCost.noUiSlider.set(data.cost)
        }

        if (data.onUpdate !== 'inputCost') {
            inputCost.setRawValue(data.cost)
        }
    }

    //Order Form

    const openFormButton = document.querySelector('#openFormBtn')
    const orderForm = document.querySelector('#orderForm')
    const submitFormBtn = document.querySelector('#submitFormBtn')
    const success = document.querySelector('#success')
    const error = document.querySelector('#error')

    openFormButton.addEventListener('click', function () {
        orderForm.classList.remove('none')
        openFormButton.classList.add('none')
    })

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(orderForm)

        submitFormBtn.setAttribute('disabled', true)
        submitFormBtn.innerHTML = 'Заявка отправляется...'
        
        orderForm.querySelectorAll('input').forEach(function (input) {
            input.setAttribute('disabled', true)
        })
        
        fetchData()
        
        async function fetchData() {
            const data = model.getData()
            const results = model.getResults()

            let url = document.location.href
            url = checkURL(url)

            function checkURL (url) {
                //http://127.0.0.1:5500/index.html
                let newURL = url
                let urlArrayDot = url.split('.')
    
                if (urlArrayDot[urlArrayDot.length - 1] === 'html') {
                    urlArrayDot.pop()
                    let urlArraySlash = urlArrayDot.join('.').split('/')
                    urlArraySlash.pop()

                    newURL = urlArraySlash.join('/')
                }
                return newURL
            }

            const response = await fetch(url + 'mail.php', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    form: {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                    }
                })
            })

            const result = await response.text()
        }
    })
}
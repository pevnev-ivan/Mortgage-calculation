import { priceFormatter } from "../utils/formatters.js"

function updateResultsView (results) {
    document.querySelector('#total-percent').innerHTML = results.rate * 100 + '%'
    document.querySelector('#total-month-payment').innerHTML = priceFormatter.format(results.monthlyPayment)
    document.querySelector('#total-cost').innerHTML = priceFormatter.format(results.pureDebtValue)
    document.querySelector('#total-overpayment').innerHTML = priceFormatter.format(results.overPayment) 
}

export default updateResultsView
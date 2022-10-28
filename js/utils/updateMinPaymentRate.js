function updateMinPaymentRate (newData) {
    document.querySelector('#percents-from').innerHTML = newData * 100 + '%'
}

export default updateMinPaymentRate
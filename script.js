const amountInput = document.getElementById('amount-to-convert');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert');
const resetBtn = document.getElementById('reset');
const result = document.getElementById('currency-result');

const convertCurrency = async () => {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    const apikey = "cur_live_Q2Gx1DotNd1HtRxpLNQUcz01kfaDMiZtFzROduBa";
    
    try {
        const response = await fetch (`https://api.currencyapi.com/v3/latest?apikey=${apikey}&base_currency=${from}&currencies=${to}`);
        const data = await response.json();
        console.log(data);

        const conversionRate = data.data[to].value;
        const convertedAmount = amount * conversionRate;

        result.textContent = `${amount} ${from.toUpperCase()} = ${convertedAmount} ${to.toUpperCase()}`
    } catch (error) {
        console.error('Error fetching exchange rates: ', error);
        result.textContent = `An error occured during conversion.`;
    }
};

function resetCurrency() {
    document.getElementById("converter-form").reset();
    result.innerHTML = "";
}

convertBtn.addEventListener("click", convertCurrency);
resetBtn.addEventListener("click", resetCurrency);

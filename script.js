const amountInput = document.getElementById('amount-to-convert');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert');
const resetBtn = document.getElementById('reset');
const result = document.getElementById('currency-result');

const convertCurrency = async () => {
    const amount = amountInput.value;
    const from = fromCurrency.value.toUpperCase();
    const to = toCurrency.value.toUpperCase();

    const apikey = "cur_live_Q2Gx1DotNd1HtRxpLNQUcz01kfaDMiZtFzROduBa";

    const url = `https://api.currencyapi.com/v3/latest?apikey=${apikey}&base_currency=${from}&currencies=${to}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.data || !data.data[to]) {
            throw new Error("Invalid response structure or unsupported currency.");
        }

        const rate = data.data[to].value;
        const convertedAmount = (amount * rate).toFixed(2);

        result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error("Error fetching exchange rates: ", error);
        result.textContent = "An error occurred during conversion.";
    }
};


function resetCurrency() {
    document.getElementById("converter-form").reset();
    result.innerHTML = "";
}

convertBtn.addEventListener("click", convertCurrency);
resetBtn.addEventListener("click", resetCurrency);

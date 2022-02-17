const API_URL = "https://blockchain.info/ticker";

function updateCurrencyValue({ nodeReference, newValue }) {
  nodeReference.setAttribute("value", newValue);
}

function updateBitcoinValueP({ nodeReference, weight, bitcoinCotation }) {
  const bitcoinPerCurrencyUnit = 1/bitcoinCotation;

  nodeReference.textContent = weight * bitcoinPerCurrencyUnit;
}

async function run() {
  console.log('runned');
  const bitcoinBuyValueP = document.getElementById("bitcoin_buy__value");
  const currencyValueInput = document.getElementById("currency_value");

  // Get bitcoin data
  const { data } = await axios.get(API_URL);
  console.log({data: data.BRL});
  updateCurrencyValue({
    nodeReference: currencyValueInput,
    newValue: 1,
  });
  updateBitcoinValueP({
    nodeReference: bitcoinBuyValueP,
    weight: currencyValueInput.value,
    bitcoinCotation: data.BRL.buy,
  });

  currencyValueInput.addEventListener('input', event => {
    const typedValue = parseFloat(event.target.value);
    const weight = isNaN(typedValue) ? 0 : typedValue;
    updateBitcoinValueP({
     nodeReference: bitcoinBuyValueP,
     weight,
     bitcoinCotation: data.BRL.buy
   });
  });
}

window.setInterval(run, 10000);

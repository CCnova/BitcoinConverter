const API_URL = "https://blockchain.info/ticker";

function updateCurrencyValue({ nodeReference, newValue }) {
  nodeReference.setAttribute("value", newValue);
}

function updateBitcoinValueP({ nodeReference, weight, bitcoinCotation }) {
  const bitcoinPerCurrencyUnit = 1/bitcoinCotation;

  nodeReference.textContent = weight * bitcoinPerCurrencyUnit;
}

(async () => {
  const bitcoinBuyValueP = document.getElementById("bitcoin_buy__value");
  const currencyValueInput = document.getElementById("currency_value");
  // const select = document.getElementById("currency_select");

  // Get bitcoin data
  const { data } = await axios.get(API_URL);
  // const currencyNames = Object.keys(data);

  // currencyNames.forEach((currency) => {
  //   const option = document.createElement("option");
  //   option.textContent = currency;
  //   select.appendChild(option);
  // });

  updateCurrencyValue({
    nodeReference: currencyValueInput,
    newValue: 1,
  });
  updateBitcoinValueP({
    nodeReference: bitcoinBuyValueP,
    weight: currencyValueInput.value,
    bitcoinCotation: data.BRL.buy,
  });

  // select.addEventListener('change', event => {
  //   updateBitcoinValueP({
  //     nodeReference: bitcoinBuyValueP,
  //     base: currencyValueInput.value,
  //     newValue: data[event.target.value].buy,
  //   })
  // }
  // );

  currencyValueInput.addEventListener('input', event => {
    const typedValue = parseFloat(event.target.value);
    const weight = isNaN(typedValue) ? 0 : typedValue;
    updateBitcoinValueP({
     nodeReference: bitcoinBuyValueP,
     weight,
     bitcoinCotation: data.BRL.buy
   });
  })
})();

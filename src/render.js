const { desktopCapturer, remote } = require('electron');
const { dialog, Menu } = remote;

/********************************************************************************
 * Respect the API owner: don't call this service excessively
 ********************************************************************************/

let url = 'https://api.coindesk.com/v1/bpi/currentprice.json',
    delay = 1000 * 60 * 5, // 5 minutes
    placeholder = 'price'; // Id of placeholder div

const callAPI = async (url) => {
  const getAPI = await fetch(url)
    .then((response) => response.json())
    .then(data => {
      updatePrice(data.bpi.USD.rate_float);
  });
}

setInterval(() => {
  callAPI(url);
}, delay);

const updatePrice = (num) => {
  document.getElementById(placeholder).innerHTML = '$' + num.toFixed(2);
}

callAPI(url);

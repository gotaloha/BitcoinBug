const { desktopCapturer, remote } = require('electron');
const { dialog, Menu } = remote;

// Global state

// Buttons
async function callAPI(url) {
  const getAPI = await fetch(url)
    .then((response) => response.json())
    .then(data => {
      const price = document.getElementById('price');
      let num = data.bpi.USD.rate_float;
      price.innerHTML = '$' + num.toFixed(2);
  });
}

callAPI('https://api.coindesk.com/v1/bpi/currentprice.json'); // Call the API on load

setInterval(function() {
  // Then call the API every 10 minutes
  callAPI('https://api.coindesk.com/v1/bpi/currentprice.json');
}, 1000 * 60 * 10);

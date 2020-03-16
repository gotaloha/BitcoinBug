const { desktopCapturer, remote } = require('electron');
const { dialog, Menu } = remote;

// Global variables

const delay = 1000 * 60 * 5; // 5 minutes (1000 milliseconds in a second * 60 seconds in a minute * how many desired minutes)

const callAPI = async (url) => {
  const getAPI = await fetch(url)
    .then((response) => response.json())
    .then(data => {
      updatePrice(data.bpi.USD.rate_float);
  })(url);

  getAPI(url); // Call the API on load

  setTimeout(getAPI(url), delay);
}

const updatePrice = (num) => {
  countdownTimer();
  document.getElementById('price').innerHTML = '$' + num.toFixed(2);
}

const countdownTimer = () => {
  console.log("countdownTimer run");
  let timer = 60 * 5,
      total = timer;

  const countdown = () => {
    if (timer <= 1) {
      clearInterval(this.timer);
      timer = total;
    } else {
      timer--;
    }
  }

  setInterval(function() {
    countdown();
  }, 1000);
}

callAPI('https://api.coindesk.com/v1/bpi/currentprice.json');

const sensor = require('ds18b20-raspi');
// const Gpio = require('onoff').Gpio; // Gpio class
// const relay = new Gpio(18, 'out'); // Export GPIO17 as an output
const express = require('express');
const router = express.Router();

// const Temp = require('./controller');

// state
const state = {
  setTemp: 180,
  setState: false,
  currentTemp: 404
};

// update temp every 10 seconds
const readSensor = setInterval(function() {
    state.currentTemp = sensor.readSimpleF(1) || 404;
}, 10000);

// Check state and turn hlt on or off
const maintainTemp = () => {
  console.log('line 108' + state.currentTemp);
  if (state.currentTemp < state.setTemp) {
    // relay.writeSync(0);
  } else if (state.currentTemp <= state.setTemp) {
    // relay.writeSync(1);
  };
};

setInterval(myTimer, 5000);

function myTimer() {
 if (state.setState === true) {
   maintainTemp();
   console.log('on');
 } else if (state.setState === false) {
  //  relay.writeSync(1);
   console.log('off')
 } else {
  //  relay.writeSync(1);
   console.log('err');
 };
};
 
 const boolCheck = arg => {
      if (arg === "true") {
          return true;
      } else if (arg === "false") {
          return false;
      };
  };

  router.get("/settings", function (req, res) {
    console.log(state)
    res.send(state);
  });
  
  router.get("/onOff", function (req, res) {
    console.log(req.query.switchState)
    state.setState = boolCheck(req.query.switchState)
    // state.hotLiquorTank()
    res.send(state);
  });
  
  router.get("/setTemp", function (req, res) {
    console.log('line 65' + req.query.temp)
    state.setTemp = parseInt(req.query.temp)
    // state.hotLiquorTank()
    res.send(state);
  });

  module.exports = router;
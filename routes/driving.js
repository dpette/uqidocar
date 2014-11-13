var express = require('express');
// var app = express();
var router = express.Router();
var gpio   = require("pi-gpio");


function setGpio(npin, value) {
  gpio.open(npin, "output", function(err) {
    gpio.write(npin, value, function() {
      gpio.close(npin);
    });
  });
}

router.get('/go', function(req, res) {
  if(req.query.direction == 1) {
    // setGpio(11, 1);
    res.json({message: 'GO!', time: Date.now()});
  } else if(req.query.direction == -1) {
    // setGpio(12, 1);
    res.json({message: 'GO BACK!', time: Date.now()});
  } else {
    // setGpio(11, 0);
    // setGpio(12, 0);
    res.json({message: 'STOP!', time: Date.now()});
  }
});

router.get('/turn', function(req, res) {
  if(req.query.direction == 1) {
    // setGpio(11, 1);
    res.json({message: 'TURN RIGHT!', time: Date.now()});
  } else if(req.query.direction == -1) {
    // setGpio(15, 1);
    res.json({message: 'TURN LEFT!', time: Date.now()});
  } else {
    // setGpio(15, 0);
    // setGpio(13, 0);
    res.json({message: 'DON\'T TURN!', time: Date.now()});
  }
});

module.exports = router;
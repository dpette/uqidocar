var express = require('express');
// var app = express();
var router = express.Router();
var gpio   = require("pi-gpio");


var setGpio = function(npin, value, callback) {
  gpio.open(npin, "output", function(err) {
    gpio.write(npin, value, function(err) {
      gpio.close(npin, function(err) {
        callback(err);
      });
    });
  });
};

router.get('/go', function(req, res) {
  if(req.query.direction == 1) {
    setGpio(11, 1, function(err) {
    });
    res.json({message: 'GO!', time: Date.now()});
  } else if(req.query.direction == -1) {
    setGpio(12, 1, function(err) {
    });
    res.json({message: 'GO BACK!', time: Date.now()});
  } else {
    setGpio(11, 0, function(err1) {
      setGpio(12, 0, function(err2) {
      });
    });
    res.json({message: 'STOP!', time: Date.now()});
  }
});

router.get('/turn', function(req, res) {
  if(req.query.direction == 1) {
    setGpio(15, 1, function(err) {
      res.json({message: 'TURN RIGHT!', time: Date.now()});
    });
  } else if(req.query.direction == -1) {
    setGpio(13, 1, function(err) {
      res.json({message: 'TURN LEFT!', time: Date.now()});
    });
  } else {
    setGpio(15, 0, function(err1) {
      setGpio(13, 0, function(err2) {
        res.json({message: 'STOP TURNING!', time: Date.now()});
      });
    });
  }
});

module.exports = router;
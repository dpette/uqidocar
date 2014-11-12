var express = require('express');
// var app = express();
var router = express.Router();
var gpio   = require("pi-gpio");


router.get('/go', function(req, res) {
  if(req.query.direction == 1) {
    gpio.open(11, "output", function(err) {
      gpio.write(11, 1, function() {
        gpio.close(11);
      });
    });
    res.json({message: 'GO!', time: Date.now()});
  } else if(req.query.direction == -1) {
    gpio.open(12, "output", function(err) {
      gpio.write(12, 1, function() {
        gpio.close(12);
      });
    });
    res.json({message: 'GO BACK!', time: Date.now()});
  } else {
    gpio.open(12, "output", function(err) {
      gpio.write(12, 0, function() {
        gpio.close(12);
      });
    });
    gpio.open(11, "output", function(err) {
      gpio.write(11, 0, function() {
        gpio.close(11);
      });
    });
    res.json({message: 'STOP!', time: Date.now()});
  }
});

router.get('/turn', function(req, res) {
  res.json({message: 'TURN!', time: Date.now()});
});

module.exports = router;
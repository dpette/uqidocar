var express = require('express');
// var app = express();
var router = express.Router();
var gpio   = require("pi-gpio");


function setGpio(npin, value) {
  console.log("pin " + npin + " to " + value);
}

var setGpio = function(npin, value, callback) {
  gpio.open(npin, "output", function(err) {
    if(err)
      callback(err);
    gpio.write(npin, value, function() {
      gpio.close(npin);
      callback(null);
    });
  });
};

router.get('/go', function(req, res) {
  if(req.query.direction == 1) {
    setGpio(11, 1, function(err) {
      if(err)
        res.json({message: 'CAN\'T GO!', time: Date.now(), error: err});
      else
        res.json({message: 'GO!', time: Date.now()});
    });
  } else if(req.query.direction == -1) {
    setGpio(12, 1, function(err) {
      if(err)
        res.json({message: 'CAN\'T GO BACK!', time: Date.now(), error: err});
      else
        res.json({message: 'GO BACK!', time: Date.now()});
    });
  } else {
    setGpio(11, 0, function(err1) {
      if(err1) {
        res.json({message: 'CAN\'T STOP!', time: Date.now(), error: err});
      } else {
        setGpio(12, 0, function(err2) {
          if(err2)
            res.json({message: 'CAN\'T STOP!', time: Date.now(), error: err});
          else
           res.json({message: 'STOP!', time: Date.now()});
        });
      }
    });
  }
});

router.get('/turn', function(req, res) {
  if(req.query.direction == 1) {
    setGpio(11, 1, function(err) {
      if(err)
        res.json({message: 'CAN\'T TURN RIGHT!', time: Date.now(), error: err});
      else
        res.json({message: 'TURN RIGHT!', time: Date.now()});

    });
  } else if(req.query.direction == -1) {
    setGpio(15, 1, function(err) {
      if(err)
        res.json({message: 'CAN\'T TURN LEFT!', time: Date.now(), error: err});
      else
        res.json({message: 'TURN LEFT!', time: Date.now()});

    });
  } else {
    setGpio(15, 0);
    setGpio(13, 0);
    res.json({message: 'DON\'T TURN!', time: Date.now()});

    setGpio(15, 0, function(err1) {
      if(err1) {
        res.json({message: 'CAN\'T TURN!', time: Date.now(), error: err});
      } else {
        setGpio(13, 0, function(err2) {
          if(err2)
            res.json({message: 'CAN\'T STOP TURNING!', time: Date.now(), error: err});
          else
           res.json({message: 'STOP TURNING!', time: Date.now()});
        });
      }
    });
  }
});

module.exports = router;
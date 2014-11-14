var express = require('express');
// var app = express();
var router = express.Router();
var gpio   = require("pi-gpio");


var setGpio = function(npin, value, callback) {
  var time = Date.now();
  gpio.write(npin, value, function(err) {
    console.log("time to write pin " + npin + ": " + (Date.now() - time));
    callback(err);
  });
};

gpio.open(11, "output", function(){
  gpio.open(12, "output", function(){
    gpio.open(13, "output", function(){
      gpio.open(15, "output", function(){

        console.log("READY FOR THE PARTY!");

        router.get('/go', function(req, res) {
          if(req.query.direction == 1) {
            setGpio(11, 1, function(err) {});
            res.json({message: 'GO!', time: Date.now()});
          } else if(req.query.direction == -1) {
            setGpio(12, 1, function(err) {});
            res.json({message: 'GO BACK!', time: Date.now()});
          } else {
            setGpio(11, 0, function(err1) {});
            setGpio(12, 0, function(err2) {});
            res.json({message: 'STOP!', time: Date.now()});
          }
        });

        router.get('/turn', function(req, res) {
          if(req.query.direction == 1) {
            setGpio(15, 1, function(err) {});
            res.json({message: 'TURN RIGHT!', time: Date.now()});
          } else if(req.query.direction == -1) {
            setGpio(13, 1, function(err) {});
            res.json({message: 'TURN LEFT!', time: Date.now()});
          } else {
            setGpio(15, 0, function(err1) {setGpio(13, 0, function(err2) {
              });
            });
            res.json({message: 'STOP TURNING!', time: Date.now()});
          }
        });


      });
    });
  });
});


module.exports = router;
var express = require('express');
var app     = express();
var stylus  = require('stylus');
var nib     = require('nib');
var driving = require("./routes/driving");
var logger  = require("morgan");
var jade    = require("jade");

// Use nib and stylus with express
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));

app.use(express.static(__dirname + '/public'));


// app logic
app.get('/', function (req, res) {
  res.render("index", {title: "Uqido Car", host: req.hostname});
});

app.use("/driving", driving);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Uqido car app listening at http://%s:%s in %s mode', host, port, app.settings.env);
});

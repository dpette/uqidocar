var isGoing   = false;
var isTurning = false;


function pressButton(dataDriveGo, dataDriveTurn){
  if(dataDriveGo || dataDriveGo == 0)
    $(".drive_control[data-drive-go]").removeClass("pressed");
  if(dataDriveTurn || dataDriveTurn == 0)
    $(".drive_control[data-drive-turn]").removeClass("pressed");
  $(".drive_control[data-drive-go= " + dataDriveGo + "]").addClass("pressed");
  $(".drive_control[data-drive-turn= " + dataDriveTurn + "]").addClass("pressed");
}

function keyboardControl(e) {


    // GO!
  if(e.which == 87 && !isGoing) {
    isGoing = true;
    $.get("/driving/go?dir=1&time=" + $.now(), function(data) {
      console.log(data.message);
      console.log("time from end of action and callback = " + ($.now() - data.time) + "ms");
      pressButton(1, undefined);
      $(document).on("keyup", function(e) {
        if(e.which == 87 && isGoing) {
          isGoing = false;
          $.get("/driving/go?dir=0&time=" + $.now(), function(data) {
            console.log(data.message);
            console.log("time from end of action and callback = " + ($.now() - data.time) + "ms");
            pressButton(0, undefined);
          });
        }
      });
    });
  }

  // GO BACK!
  if(e.which == 83 && !isGoing) {
    isGoing = true;
    $.get("/driving/go?dir=-1&time=" + $.now(), function(data){
      console.log(data.message);
      console.log("time from end of action and callback = " + ($.now() - data.time) + "ms");
      pressButton(-1, undefined);
      $(document).on("keyup", function(e) {
        if(e.which == 83 && isGoing) {
          isGoing = false;
          $.get("/driving/go?dir=0&time=" + $.now(), function(data) {
            console.log(data.message);
            console.log("time from end of action and callback = " + ($.now() - data.time) + "ms");
            pressButton(0, undefined);
          });
        }
      });
    });
  }

  // TURN LEFT
  if(e.which == 65 && !isTurning) {
    isTurning = true;
    $.get("/driving/turn?dir=-1&time=" + $.now(), function(data){
      console.log(data.message);
      console.log("time from end of action and callback = " + ($.now() - data.time) + "ms");
      pressButton(undefined, -1);
      $(document).on("keyup", function(e) {
        if(e.which == 65 && isTurning) {
          isTurning = false;
          $.get("/driving/turn?dir=0&time=" + $.now(), function(data) {
            console.log(data.message);
            console.log("time from end of action and callback = " + ($.now() - data.time) + "ms");
            pressButton(undefined, 0);
          });
        }
      });
    });
  }

  // TURN RIGHT
  if(e.which == 68 && !isTurning) {
    isTurning = true;
    $.get("/driving/turn?dir=1&time=" + $.now(), function(data){
      console.log(data.message);
      console.log("time from end of action and callback = " + ($.now() - data.time) + "ms");
      pressButton(undefined, 1);
      $(document).on("keyup", function(e) {
        if(e.which == 68 && isTurning) {
          isTurning = false;
          $.get("/driving/turn?dir=0&time=" + $.now(), function(data) {
            console.log(data.message);
            console.log("time from end of action and callback = " + ($.now() - data.time) + "ms");
            pressButton(undefined, 0);
          });
        }
      });
    });
  }
}


function mouseControl(e) {

  e.preventDefault();

  var buttonPressed = $(e.target);

  if(buttonPressed.data("driveGo") && !isGoing) {
    isGoing = true;
    $.get("/driving/go?dir=" + $(this).data("driveGo"), function(data) {
      console.log(data);
      pressButton(1, undefined);
      buttonPressed.on("mouseup", function(e) {
        e.preventDefault();
        if(isGoing) {
          isGoing = false;
          $.get("/driving/go?dir=0", function(data) {
            console.log(data);
            pressButton(0, undefined);
          });
        }
      });
    });
  }

  if(buttonPressed.data("driveTurn") && !isTurning) {
    isTurning = true;
    $.get("/driving/turn?dir=" + $(this).data("driveTurn"), function(data) {
      console.log(data);
      pressButton(1, undefined);
      buttonPressed.on("mouseup", function(e) {
        e.preventDefault();
        if(isTurning) {
          isTurning = false;
          $.get("/driving/turn?dir=0", function(data) {
            console.log(data);
            pressButton(0, undefined);
          });
        }
      });
    });
  }
}

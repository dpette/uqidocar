/* Copyright (C) 2007 Richard Atterer, richardÂ©atterer.net
   This program is free software; you can redistribute it and/or modify it
   under the terms of the GNU General Public License, version 2. See the file
   COPYING for details. */


// STREAMING VIA SNAPSHOTS
var imageNr = 0; // Serial number of current image
var finished = []; // References to img objects which have finished downloading
var paused = false;
var webcamServerUri = "";

function createImageLayer(myWebcamServerUri) {
  var img = new Image();

  if(myWebcamServerUri)
    webcamServerUri = myWebcamServerUri;
  img.style.position = "absolute";
  img.style.zIndex = -1;
  img.onload  = imageOnload;
  img.onclick = imageOnclick;
  img.src = webcamServerUri + "/?action=snapshot&n=" + (++imageNr);
  var webcam = document.getElementById("video_stream");
  webcam.insertBefore(img, webcam.firstChild);
}

// Two layers are always present (except at the very beginning), to avoid flicker
function imageOnload() {
  this.style.zIndex = imageNr; // Image finished, bring to front!
  while (1 < finished.length) {
    var del = finished.shift(); // Delete old image(s) from document
    del.parentNode.removeChild(del);
  }
  finished.push(this);
  if (!paused) createImageLayer(webcamServerUri);
}

function imageOnclick() { // Clicking on the image will pause the stream
  paused = !paused;
  if (!paused) createImageLayer();
}


// STREAMING VIA STREAM (i'm not joking, see raspberry_host:8080 for docs)
// function takeSnapshot(webCamServerUri) {
//   $.get

// }


// reload stream, replace img tag that point to simple stream, 
function reloadStream(webCamServerUri) {
  var img = new Image();
  var videoStream = $("#video_stream");
  img.src = webCamServerUri + "/?action=stream";
  img.onload   = removeOldStream;
  img.onerror  = shit;
  videoStream.prepend(img);
}

function removeOldStream() {
  // console.log("holy shit");
  var videoStream = $("#video_stream");
  videoStream.find("img").last().remove();
}

function shit(){
  $(this).last().remove();
}
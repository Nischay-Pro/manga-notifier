
var running = browser.storage.local.get("running");
running.then(function(item){
  console.log(item);
  if(item.running !== void 0){
    //running
  } else {
    //not running
    browser.storage.local.set({
      running: "1"
    });
    startSync();
  }
}, function(error){
  console.log(`Error: ${error}`);
});

function startSync() {

  function onGot(item) {
    var frequency = 1;
    if (item.frequency !== void 0) {
      frequency = item.frequency;
    }
    // single call to start the sync loop
    browser.runtime.sendMessage({});
  }

  var getting = browser.storage.local.get("data");
  getting.then(onGot, function (error) {
    console.log(error);
  });
}

function onWindowClosing(e) {
  console.log("Window closing.");
  // browser.storage.local.set({
  //   running: "0"
  // });
}

window.onbeforeunload = onWindowClosing;

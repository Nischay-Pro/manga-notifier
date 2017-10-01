var nIntervId;

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
    // repeating call that reloads the data
    browser.runtime.sendMessage({});
    nIntervId = setInterval(function () {
      browser.runtime.sendMessage({});
    }, frequency*3600*1000);
  }

  var getting = browser.storage.local.get("data");
  getting.then(onGot, function (error) {
    console.log(error);
  });
}

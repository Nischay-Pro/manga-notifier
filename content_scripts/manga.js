
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

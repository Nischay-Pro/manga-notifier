console.log("Script Start");

// START - Border Color Block

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  var color = ["red","blue"];
  if (item.color) {
    color = item.color;
  }
  document.body.style.border = "10px solid " + color[1];
}

var getting = browser.storage.local.get("color");
getting.then(onGot, onError);

// END - Border Color Block

notify("Test","djsd","basic");
function notify(title, content, type) {
    browser.runtime.sendMessage({
        title: title,
        content: content,
        type: type
    });

}

console.log("End reached.")

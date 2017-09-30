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
  console.log(color);
  document.body.style.border = "10px solid " + color[1];
}

var getting = browser.storage.local.get("color");
getting.then(onGot, onError);

// END - Border Color Block

var titles = document.getElementsByClassName("tips"); // "tips" is for the series specific page parsing
console.log(titles.length);
[].forEach.call(titles, function (title) {
  console.log(title.innerText);
  // The "new", "hot" and such tags are being added in innerText by mangafox. Need to trim.
    title.style.color = "green"; // marking as done
})

notify("Test","djsd","basic");
function notify(title, content, type) {
    browser.runtime.sendMessage({
        title: title,
        content: content,
        type: type
    });
}

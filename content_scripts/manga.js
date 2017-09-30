console.log("Script Start");
document.body.style.border = "5px solid red";
var titles = document.getElementsByClassName("title");
console.log(titles.length);
[].forEach.call(titles, function (title) {
  // console.log(title.innerText);
  // The "new", "hot" and such tags are being added in innerText by mangafox. Need to trim.
    title.getElementsByTagName('a')[0].style.color = "green"; // marking as done
})

notify("Test","djsd","basic");
function notify(title, content, type) {
    browser.runtime.sendMessage({
        title: title,
        content: content,
        type: type
    });
}

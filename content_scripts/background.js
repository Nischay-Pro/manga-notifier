function notify(message) {
    console.log("background script received message");

    var data = message;
    console.log(data.title)
    getContent();
    // browser.notifications.create({
    //     "type": data.type,
    //     "iconUrl": browser.extension.getURL("icons/manga-48.png"),
    //     "title": data.title,
    //     "message": data.content
    // });
}

function getContent() {
  console.log("getContent called.");
  var xhr = new XMLHttpRequest();
  // xhr.addEventListener("readystatechange", function(){
  xhr.onreadystatechange = function (){
  // console.log("processReq called. readyState = " + xhr.readyState);
  if(this.readyState == 4){
    console.log("text parsing begins.");
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.responseText, "text/html");
    var titles = doc.getElementsByClassName("title");
    console.log(titles.length);
    [].forEach.call(titles, function (title) {
        // title.getElementsByTagName('a')[0].style.color = "green"; // marking as done
        console.log(title.getElementsByTagName('a')[0].innerText);
    })
  }
};
xhr.open("GET","http://mangafox.me/releases/index.html",true);
xhr.send();
}

browser.runtime.onMessage.addListener(notify);

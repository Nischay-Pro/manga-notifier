function notify(message) {
    var data = message;
    browser.notifications.create({
        "type": data.type,
        "iconUrl": browser.extension.getURL("icons/manga-48.png"),
        "title": data.title,
        "message": data.content
    });
}

function refresh(message){
  console.log("refresh called.");
  var getting = browser.storage.local.get("data");
  getting.then(function(res){
    console.log(res);
    var links = res.data.mangaTags;
    getContent(links,0);
  });
}

function getContent(links,ind) {
  var url = links[ind].tag;
  console.log("getContent called with " + url);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (){
    // console.log("status " + this.status);
    if(this.readyState == 4){
      // console.log("text parsing begins. status " + this.status);
      var parser = new DOMParser();
      var doc = parser.parseFromString(this.responseText, "text/html");
      var titles = doc.getElementsByClassName("tips");
      if(titles[0] !== void 0){
        // do some notif checks here
        var lastSeen = browser.storage.local.get(url);
        lastSeen.then(function (res) {
          if(res[url] !== void 0){
            // value exists
            if(res[url] !== titles[0].innerText){
              //something new. Notify user.
              notify({
                type: "basic",
                title: titles[0].innerText,
                message: "New content uploaded."
              });
            } else {
              console.log("No new chapters for " + res[url]);
            }
          } else {
            // add value
            var obj = {};
            obj[url] = titles[0].innerText;
            browser.storage.local.set(obj);
          }
        });
      }
      if(links[ind+1] !== void 0){
        getContent(links,ind+1);
      }
    }
  };
  xhr.open("GET",url,true);
  xhr.send();
}

browser.runtime.onMessage.addListener(refresh);

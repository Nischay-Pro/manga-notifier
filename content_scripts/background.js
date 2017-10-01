var nIntervId = 0;
var currFreq = 1;
var running = 0;

function notify(message) {
    var data = message;
    // console.log(data.type + "," + data.title + "," + data.content);
    browser.notifications.create({
        "type": data.type,
        "iconUrl": browser.extension.getURL("icons/manga-48.png"),
        "title": data.title,
        "message": data.content
    });
}

function bgLoop (message) {

  if (running == 0){
    // console.log("running bgLoop");
    running = 1;
    refresh();
    nIntervId = setInterval(refresh, currFreq*3600*1000); // 10 * 1 * 1000
  }
  // else{
  //   console.log("running = " + running + ". Not running bgLoop");
  // }

}

function refresh(){
  // console.log("refresh called.");
  var getting = browser.storage.local.get("data");
  getting.then(function(res){
    // console.log(res);
    // Check if freq is the same. Else clear and restart.
    if(res.data.frequency == currFreq){
      var links = res.data.mangaTags;
      getContent(links,0);
    }
    else{
      // console.log("Freq changed.");
      currFreq = res.data.frequency;
      clearInterval(nIntervId); // clear currently running interval
      running = 0; // needed so that bgLoop restarts properly
      bgLoop({}); // call bgloop in order to restart the loop with new freq
    }
  });
}

function getContent(links,ind) {
  var url = links[ind].tag;
  // console.log("getContent called with " + url);

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
              //innerText needs to be trimmed to remove chapter number
              notify({
                type: "basic",
                title: titles[0].innerText,
                content: "New content uploaded."
              });
            }
            // else {
            //   // console.log("No new chapters for " + res[url]);
            //   notify({
            //     type: "basic",
            //     title: titles[0].innerText,
            //     content: "No new content."
            //   });
            // }
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

browser.runtime.onMessage.addListener(bgLoop);

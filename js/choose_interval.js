function openInNewTab() {
  chrome.tabs.create({
    url: chrome.runtime.getURL("../options/dashboard.html")
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var settingsbutton = document.getElementById("settings-button");
  // console.log(settingsbutton);
  settingsbutton.addEventListener('click', openInNewTab);
});
var manifest = chrome.runtime.getManifest() || browser.runtime.getManifest();
document.getElementById("test").innerHTML = 'Manga Notifier <h6>v' + manifest.version;

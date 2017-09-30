function notify(message) {
    console.log("background script received message");
    var data = message;
    console.log(data.title)
    browser.notifications.create({
        "type": data.type,
        "iconUrl": browser.extension.getURL("icons/manga-48.png"),
        "title": data.title,
        "message": data.content
    });
}
browser.runtime.onMessage.addListener(notify);
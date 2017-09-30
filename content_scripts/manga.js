document.body.style.border = "5px solid red";

notify("Test","djsd","basic");
function notify(title, content, type) {
    browser.runtime.sendMessage({
        title: title,
        content: content,
        type: type
    });
}
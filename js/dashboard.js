function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    frequency: $("#interval").children(":selected").attr("value")
  });
  document.getElementById('frequencynot').innerText = "Current Frequency for checking: " + $("#interval").children(":selected").attr("value") + " hour(s)";
}

function restoreOptions() {

  function setCurrentChoice(result) {
    console.log(result.frequency);
    document.getElementById('interval').value = result.frequency || 1;
    $("#interval").val(result.frequency || 1).trigger('change');
    document.getElementById('frequencynot').innerText = "Current Frequency for checking: " + (result.frequency || 1) + " hour(s)";

  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("frequency");
  getting.then(setCurrentChoice, onError);
}

function formatState(state) {
  if (!state.id) {
    return state.text;
  }
  var $state = $(
    '<span>' + state.text + '</span>'
  );
  console.log(state.text);
  return $state;
};
$('.js-example-basic-single').select2({
  templateSelection: formatState
});
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
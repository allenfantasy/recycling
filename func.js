function isGoogle() {
  var regex = new RegExp(/www\.google\.[\S]{2,256}$/);
  return document.URL.match(regex) ? true : false;
}

if (isGoogle()) {
  // init key
  window.onload = function() {
    var searchInput = document.getElementById('lst-ib'), form = document.forms[0];
    console.log("fine");
    console.dir(searchInput);

    // update 'key'
    //searchInput.addEventListener('input', function() {
    form.addEventListener('submit', function(e) {
      chrome.runtime.sendMessage({ // ok
        key: form.q.value
      }, function(res) { console.log(res.key) });
    });
  }

  chrome.runtime.sendMessage({
    key: searchInput ? searchInput.value : '',
    url: document.URL
  }, function(res) {
  });
}
else {
  window.onload = function() {
  }
}

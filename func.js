function isGoogle() {
  var regex = new RegExp(/www\.google\.[\S]{2,256}$/);
  return document.URL.match(regex) ? true : false;
}

if (isGoogle()) {
  // init key
  window.addEventListener("hashchange", function() {
    var searchInput = document.getElementById('lst-ib')
      , form = document.forms[0]
      , tmp = location.hash.match(/&q=[\S]*&/), key;
    console.log(tmp[0].substring(3, tmp[0].length - 1));
    key = tmp.length > 0 ? tmp[0].substring(3, tmp[0].length - 1) : "";

    chrome.runtime.sendMessage({
      key: key,
    }, function(res) {
      console.log('changed');
    });
  }, false);

  window.onload = function() {
    var searchInput = document.getElementById('lst-ib'), form = document.forms[0];
    var tmp = location.hash.match(/&q=[\S]*&/);
    var key = searchInput.value || form.q.value || (tmp && tmp.length > 0 ? tmp[0].substring(3, tmp[0].length - 1) : "");

    chrome.runtime.sendMessage({
      key: key,
    }, function(res) {
      console.log('init send');
    });
  }

}
else {
  window.onload = function() {
    chrome.runtime.sendMessage({
    }, function(res) {
      console.log('init send -- not google');
    });
  }
}

//var req = new XMLHttpRequest();
//req.open("GET", this.searchOnFlickr_, true);
//req.onload = this.showPhotos_.bind(this);
//req.send(null);

// Register 'click' event to button
$(document).ready(function() {
  var bg = chrome.extension.getBackgroundPage()
    , Recycle = bg.Recycle
    , key = Recycle.getKey();
  if (key) {
    $('#key-helper').html("You are searching:");
    $('#search-key').html(key);
  }
  else {
    $('#key-helper').html("You haven't got a keyword.");
    $('#search-key').html("<span id='google'>Search One</span>");
  }

  //$('#url').html("URL: " + Recycle.getUrl())
  //$('#title').html("Title: " + Recycle.getTitle());
  $('#confirm').on('click', function() {
    // TODO: detect empty score & key

    var page = {
      page: {
        key: Recycle.getKey(),
        title: Recycle.getTitle(),
        url: Recycle.getUrl(),
        score: $('#score-input').val()
      }
    }
    console.log(json2xml(page));

    // send AJAX req to backend
    $.ajax({
      url: 'http://192.168.1.61:8080/SearchToolbar/receiveData.jsp',
      type: "POST",
      dataType: 'xml',
      data: {
        //page: JSON.stringify(page)
        page: '<?xml version="1.0"?>' + json2xml(page)
      }
    }, function() {

    });
  });
  $('#skip').on('click', function() {
    window.close();
  });
  $("#google").on('click', function() {
    var bg = chrome.extension.getBackgroundPage();
    bg.jumpToGoogle();
    window.close();
  });
});

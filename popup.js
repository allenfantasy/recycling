//var req = new XMLHttpRequest();
//req.open("GET", this.searchOnFlickr_, true);
//req.onload = this.showPhotos_.bind(this);
//req.send(null);

// Register 'click' event to button
$(document).ready(function() {
  var bg = chrome.extension.getBackgroundPage()
    , Recycle = bg.Recycle;
  $('#search-key').html(Recycle.getKey());
  $('#test').on('click', function() {
    // send AJAX req to backend
    $.ajax({
      url: 'http://localhost:9292',
      type: "POST",
      data: {
        key: Recycle.getKey(),
        title: Recycle.getTitle(),
        url: Recycle.getUrl()
      }
    });
  });
});

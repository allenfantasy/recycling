var Recycle = {
  key: '',
  title: '',
  url: '',

  getKey: function() { return this.key; },
  getTitle: function() { return this.title; },
  getUrl: function() { return this.url; },

  setKey: function(key) { this.key = key; },
  setTitle: function(title) { this.title = title; },
  setUrl: function(url) { this.url = url; },

  fetchPageInfo: function() {
    var tab = this.tab;
    this.setTitle(tab.title);
    this.setUrl(tab.url);
    // TODO: meta & screenshot?
  },

  setCurrentTab: function() {
    chrome.tabs.query(
      {currentWindow: true, active : true},
      function(tabArray){
        if (Recycle.tab != tabArray[0]) {
          Recycle.tab = tabArray[0];
          Recycle.fetchPageInfo();
        }
      }
    )
  },

  savePage: function() {
    // fetch current webpage info
    // send XHR request to backend
  },
  inGoogle: function() {
    var regex = new RegExp(/www\.google\.[\S]{2,256}$/);
    return this.getUrl().match(regex) ? true : false;
  }
};

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");

  if (req.key) {
    Recycle.setKey(req.key);
  }

  //if (sender.tab) Recycle.setUrl(sender.tab.url);

  Recycle.setCurrentTab();

  sendResponse({
    key: Recycle.getKey()
  });

});

chrome.tabs.onActiveChanged.addListener(function(tabId, selectInfo) {
  Recycle.setCurrentTab();
});

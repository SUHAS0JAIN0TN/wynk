chrome.tabs.onUpdated.addListener((tabId, obj, tab) => {
  console.log(tab.url,tabId);
  if (tab.url && tab.url.includes("wynk.in/")) {
    console.log(tabId);
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
    }).then(function (items) {
      // var allKeys = Object.keys(items);
      console.log(items);
      // return items;
    });
  }
});

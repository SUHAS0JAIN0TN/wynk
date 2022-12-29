chrome.tabs.onUpdated.addListener((tabId, obj, tab) => {
  if (tab.url && tab.url.includes("wynk.in/")) {
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
    });
  }
});

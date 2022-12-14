
export async function  getPlaylistNames() {
    var res = chrome.storage.sync.get(null).then(function (items) {
      var allKeys = Object.keys(items);
      return allKeys;
    });
    return res;
  };

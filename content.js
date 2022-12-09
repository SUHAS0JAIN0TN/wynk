const getPlaylistData = async () => {
  var res = chrome.storage.sync.get(null).then(function (items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
    return allKeys;
  });
  console.log(res, "llllllll");
  return res;
};

window.addEventListener("load", async function () {
  addToPlayListDiv = document.createElement("div");
  addToPlayList = document.createElement("span");

  addToPlayList.innerHTML = "+";
  addToPlayList.style.cssText =
    "color: rgb(255, 255, 255);font-size: 45px; display: flex; align-items: center;margin-right: 10px;position:relative";

  addToPlayListDiv.appendChild(addToPlayList);
  playBar = document.getElementsByClassName(
    "flex-grow text-right mr-4 flex justify-end sm:flex-1 h-full"
  )[0];
  playBar.insertBefore(addToPlayList, playBar.firstChild);
  addToPlayList.addEventListener("click", async (e) => {
    if (addToPlayList.getElementsByTagName("div")[0] != undefined) {
      addToPlayList.getElementsByTagName("div")[0].remove();
    } else {
      let divv = document.createElement("div");
      divv.style.cssText =
        "background:#fff; color:#000;padding:10px;font-size:15px;margin:5px auto;position:absolute;bottom:80px;    right: -32px; width: 100px; text-align:left";
      var playlist_data = await getPlaylistData();
      for (i = 0; i < playlist_data.length; i++) {
        tem_ = document.createElement("div");
        tem_.innerHTML = playlist_data[i];
        divv.appendChild(tem_);
      }
      tem_ = document.createElement("div");
      tem_.innerHTML = "Add Playlist";
      divv.appendChild(tem_);
      addToPlayList.appendChild(divv);
    }
    e.stopPropagation();
  });
});

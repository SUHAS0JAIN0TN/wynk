async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });

  return tabs[0];
}
const create_playlist = (playlist_name) => {
  playlist_temp = document.createElement("div");
  playlist_temp.className = "col-12 navMain insidelist";
  span_el = document.createElement("span");
  span_el.innerText = playlist_name;
  playlist_temp.appendChild(span_el);
  song_te = document.createElement("div");
  song_te.className = "navinside";
  playlist_temp.appendChild(song_te);
  return playlist_temp;
};

const play_song = async (el) => {
  el.stopPropagation();
  const activeTab = await getActiveTabURL();
  console.log("before stop");
  chrome.tabs.sendMessage(activeTab.id, { type: "STOP" }, function () {
    chrome.tabs.update(
      activeTab.id,
      {
        url: "https://wynk.in" + el.target.getAttribute("link"),
      },
      function (tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (info.status === "complete" && tabId === tab.id) {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(tab.id, { type: "PLAY" });
          }
        });
      }
    );
  });
};
const create_song = (arra) => {
  song_temp = document.createElement("div");
  song_temp.className = "song";
  song_name_div = document.createElement("div");
  song_name_div.addEventListener("click", play_song);
  song_name_div.innerText = arra[1];
  song_name_div.setAttribute("link", arra[0]);
  song_temp.appendChild(song_name_div);
  del_div = document.createElement("div");
  del_img = document.createElement("img");
  del_img.className = "delbtn";
  del_img.addEventListener("click", songdel);
  del_img.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZUlEQVRIiWNgGCmggYGB4T8a7iBGIyMWsf8UOgbFTCYKDSMbwIKBYvU09wGxFqC7kGgfDhofjFowasGoBRQAFiLVoRfr2Ip5rGDAgugplEavxXBhZD1EAT8GBoYnJFjwBKpnGAIAUcAmPA1WYN0AAAAASUVORK5CYII=";
  del_div.appendChild(del_img);
  song_temp.appendChild(del_div);
  return song_temp;
};
const songdel = async (el) => {
  el.stopPropagation();
  song_ind = el.target.parentElement.parentElement.getAttribute("ind");
  playlist = el.target.parentElement.parentElement.getAttribute("playlist");
  console.log(song_ind, playlist);
  el.target.parentElement.parentElement.remove();
  all_data = await getPlaylistSongs();
  console.log(all_data[playlist]);
  songs_in_playlist = JSON.parse(all_data[playlist]);
  console.log(songs_in_playlist);
  songs_in_playlist.splice(song_ind, 1);
  console.log(songs_in_playlist);
  chrome.storage.sync.set({ [playlist]: JSON.stringify(songs_in_playlist) });
};
const btn = document.querySelector("#save");

const expand = (e) => {
  let navmain = e.target.parentElement;
  subav = navmain.querySelector(".navinside");
  subav.classList.toggle("active");
};

const getPlaylistNames = async () => {
  var res = chrome.storage.sync.get(null).then(function (items) {
    var allKeys = Object.keys(items);
    return allKeys;
  });
  return res;
};
const getPlaylistSongs = async (playlistName) => {
  var res = chrome.storage.sync.get(playlistName).then(function (items) {
    // var allKeys = Object.keys(items);
    return items;
  });
  return res;
};
window.addEventListener("load", async function () {
  const activeTab = await getActiveTabURL();
  container = document.getElementsByClassName("nav row")[0];
  if (activeTab.url.includes("wynk.in/")) {
    all_data = await getPlaylistSongs();
    playlists = Object.keys(all_data);
    console.log(playlists);
    for (let i = 0; i < playlists.length; i++) {
      temp_play = create_playlist(playlists[i]);
      temp_play.addEventListener("click", expand);
      container.appendChild(temp_play);
      insertion_div = temp_play.getElementsByClassName("navinside")[0];
      console.log(insertion_div);
      all_songs = JSON.parse(all_data[playlists[i]]);
      console.log(all_songs);
      for (let j = 0; j < all_songs.length; j++) {
        song_div = create_song(all_songs[j]);
        song_div.setAttribute("ind", j);
        song_div.setAttribute("playlist", playlists[i]);
        insertion_div.appendChild(song_div);
      }
    }
  } else {
    container.innerText = "This is not the page";
  }
});

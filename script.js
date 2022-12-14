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
const create_song = () => {
  song_temp = document.createElement("div");
  song_temp.className = "song";
  song_temp.appendChild(document.createElement("div"));
  del_div = document.createElement("div");
  del_img = document.createElement("img");
  del_img.className = "delbtn";
  del_img.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZUlEQVRIiWNgGCmggYGB4T8a7iBGIyMWsf8UOgbFTCYKDSMbwIKBYvU09wGxFqC7kGgfDhofjFowasGoBRQAFiLVoRfr2Ip5rGDAgugplEavxXBhZD1EAT8GBoYnJFjwBKpnGAIAUcAmPA1WYN0AAAAASUVORK5CYII=";
  del_div.appendChild(del_img);
  song_temp.appendChild(del_div);
  return song_temp;
};
const songdel = (el) => {
  console.log(el);
  console.log(el.target);
  el.target.parentElement.parentElement.remove();
  el.stopPropagation();
};
const btn = document.querySelector("#save");

const expand = (e) => {
  console.log(e, "sdaf");
  let navmain = e.target.parentElement;
  subav = navmain.querySelector(".navinside");
  console.log(subav.innerText);
  subav.classList.toggle("active");
  // console.log(subav.classList);
};
insidelistElements = document.getElementsByClassName("insidelist");

for (var i = 0; i < insidelistElements.length; i++) {
  insidelistElements[i].addEventListener("click", expand);
}
deleteSongElements = document.getElementsByClassName("delbtn");

for (var i = 0; i < deleteSongElements.length; i++) {
  deleteSongElements[i].addEventListener("click", songdel);
}
btn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    console.log(tabs[0]);
    let url = tabs[0].url;
    if (!localStorage.getItem("playlists")) {
      tem = [url];
      console.log(tem);
      tem = JSON.stringify(tem);
      console.log(tem);
      localStorage["playlists"] = tem;
    } else {
      console.log(45);
      tem = localStorage["playlists"];
      console.log(tem);
      tem = JSON.parse(tem);
      console.log(tem);
      tem.push(url);
      console.log(tem);
      tem = JSON.stringify(tem);
      console.log(tem);

      localStorage["playlists"] = tem;
    }
  });
  console.log(localStorage["playlists"]);
});

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
  all_data = await getPlaylistSongs();
  playlists = Object.keys(all_data);
  console.log(playlists);
  container = document.getElementsByClassName("nav row")[0];
  for(let i=0;i<playlists.length; i++){
    temp_play = create_playlist(playlists[i]);
    container.appendChild(temp_play);

  }
});
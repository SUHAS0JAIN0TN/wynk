addToPlayList = undefined;
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
const add_song_to_playlist = async (e) => {
  var player = document.getElementsByClassName(
    "fixed bottom-0 w-full items-center h-20 xl:w-10/12 m-auto left-0 right-0 rounded border-none z-50"
  )[0].firstChild.firstChild.childNodes[1].firstChild;
  playlist_name = e.target.innerText;
  console.log(player, playlist_name);
  var link = player.getAttribute("href");
  var name = player.getAttribute("title");
  songs = await getPlaylistSongs(playlist_name);
  console.log(songs);
  songs = JSON.parse(songs[playlist_name]);
  songs.push([link, name]);
  chrome.storage.sync.set({ [playlist_name]: JSON.stringify(songs) });
  e.stopPropagation();
};

const create_playlist = (e) => {
  var play_name = prompt("Enter Name of Playlist");
  chrome.storage.sync.set({ [play_name]: JSON.stringify([]) });
  remove_playlist_display();
  e.stopPropagation();
};

const remove_playlist_display = () => {
  if (addToPlayList.getElementsByTagName("div")[0] != undefined) {
    addToPlayList.getElementsByTagName("div")[0].remove();
  }
};

const clear_storage = () => {
  chrome.storage.sync.clear();
};
const get_all_storage = async () => {
  var res = chrome.storage.sync.get().then(function (items) {
    // var allKeys = Object.keys(items);
    console.log(items);
    return items;
  });
  return res;
};

// window.addEventListener("load", async function () {
//   console.log(await get_all_storage());
//   // clear_storage();
//   addToPlayListDiv = document.createElement("div");
//   addToPlayList = document.createElement("span");

//   addToPlayList.innerHTML = "+";
//   addToPlayList.style.cssText =
//     "cursor: pointer; color: rgb(255, 255, 255);font-size: 45px; display: flex; align-items: center;margin-right: 10px;position:relative";

//   addToPlayListDiv.appendChild(addToPlayList);
//   playBar = document.getElementsByClassName(
//     "flex-grow text-right mr-4 flex justify-end sm:flex-1 h-full"
//   )[0];
//   playBar.insertBefore(addToPlayList, playBar.firstChild);
//   addToPlayList.addEventListener("click", async (e) => {
//     e.stopPropagation();
//     if (addToPlayList.getElementsByTagName("div")[0] != undefined) {
//       remove_playlist_display();
//     } else {
//       let divv = document.createElement("div");
//       divv.style.cssText =
//         "cursor: pointer; background:#fff; color:#000; padding:10px; font-size:15px; margin:5px auto; position:absolute; bottom:80px; right: -32px; width: 100px; text-align:left";
//       var playlist_data = await getPlaylistNames();
//       for (i = 0; i < playlist_data.length; i++) {
//         tem_ = document.createElement("div");
//         tem_.innerHTML = playlist_data[i];
//         tem_.addEventListener("click", add_song_to_playlist);
//         divv.appendChild(tem_);
//       }
//       tem_ = document.createElement("div");
//       tem_.innerHTML = "Add Playlist";
//       tem_.addEventListener("click", create_playlist);
//       divv.appendChild(tem_);
//       addToPlayList.appendChild(divv);
//     }
//   });
// });

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  console.log(obj, "fhgfc");
  play_pause_btn = document.getElementsByClassName("text-sm btn-primary text-white min-w-[111px] text-center h-[40px] md:h-auto")[0]
  console.log(play_pause_btn);
  if (obj["type"] == "PLAY" ){
    
    play_pause_btn = document.getElementsByClassName("text-sm btn-primary text-white min-w-[111px] text-center h-[40px] md:h-auto")[0]
    console.log(play_pause_btn, play_pause_btn.innerText);
    if ('Play Now' == play_pause_btn.innerText){
      play_pause_btn.click();
    }
    
  }
  playBar = document.getElementsByClassName(
    "flex-grow text-right mr-4 flex justify-end sm:flex-1 h-full"
  )[0];
  whole_paybar = playBar.parentElement
  if (obj["type"] == "STOP" ){
    
    whole_paybar = playBar.parentElement
    play_pause_btn = whole_paybar.getElementsByTagName("button")[0]
    console.log(play_pause_btn, play_pause_btn.innerText);
    if ('Pause' == play_pause_btn.title){
      play_pause_btn.click();
    }
    
  }
  // console.log(await get_all_storage());
  // clear_storage();
  if (obj["type"] == "NEW" /*|| obj["type"] == "PLAY"*/) {
    if (playBar.firstChild.tagName.toLowerCase() != "span") {
      addToPlayListDiv = document.createElement("div");
      addToPlayList = document.createElement("span");

      addToPlayList.innerHTML = "+";
      addToPlayList.style.cssText =
        "cursor: pointer; color: rgb(255, 255, 255);font-size: 45px; display: flex; align-items: center;margin-right: 10px;position:relative";

      addToPlayListDiv.appendChild(addToPlayList);
      playBar.insertBefore(addToPlayList, playBar.firstChild);
      addToPlayList.addEventListener("click", async (e) => {
        e.stopPropagation();
        if (addToPlayList.getElementsByTagName("div")[0] != undefined) {
          remove_playlist_display();
        } else {
          let divv = document.createElement("div");
          divv.style.cssText =
            "cursor: pointer; background:#fff; color:#000; padding:10px; font-size:15px; margin:5px auto; position:absolute; bottom:80px; right: -32px; width: 100px; text-align:left";
          var playlist_data = await getPlaylistNames();
          for (i = 0; i < playlist_data.length; i++) {
            tem_ = document.createElement("div");
            tem_.innerHTML = playlist_data[i];
            tem_.addEventListener("click", add_song_to_playlist);
            divv.appendChild(tem_);
          }
          tem_ = document.createElement("div");
          tem_.innerHTML = "Add Playlist";
          tem_.addEventListener("click", create_playlist);
          divv.appendChild(tem_);
          addToPlayList.appendChild(divv);
        }
      });
    }
  }
  // else if (obj["type"] == "PLAY") {
  //   // console.log(obj, "gggggg");
  //   // window.location.replace(obj.url);
  //   window.addEventListener("load",() => {
  //     console.log("after reload");});
  //   // chrome.tabs.update()
  // }
});

// async function fetchData() {
//     const res=await fetch ("https://api.coronavirus.data.gov.uk/v1/data");
//     const record=await res.json();
//     document.getElementById("date").innerHTML=record.data[0].date;
//     document.getElementById("areaName").innerHTML=record.data[0].areaName;
//     document.getElementById("latestBy").innerHTML=record.data[0].latestBy;
//     document.getElementById("deathNew").innerHTML=record.data[0].deathNew;
// }
// fetchData();
// console.log("suahs");
// console.log(localStorage);
// console.log(chrome.tabs);
// chrome.tabs.query({
//     active: true,
//     currentWindow: true
//   }, function(tabs) {
//       console.log(tabs);
//     var tab = tabs[0];
//     var url = tab.url;
//     console.log(url);
//   });

//   chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     console.log(tabs[0]);
//     let url = tabs[0].url;
//     console.log(url);
//     // use `url` here inside the callback because it's asynchronous!
// });
create_playlist = () => {
  playlist_temp = document.createElement("div");
  playlist_temp.className = "col-12 navMain insidelist";
  playlist_temp.appendChild(document.createElement("span"));
  song_te = document.createElement("div");
  song_te.className = "navinside";
  playlist_temp.appendChild(song_te);
  return playlist_temp;
};
create_song = () => {
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
console.log(btn);
// let subav = document.querySelector(".navinside");
// let navmain = document.querySelector(".navMain");
// document.addEventListener("click", (e) => {
//     // console.log(e.target.innerText);
//     let navmain = e.target
//     subav = navmain.querySelector(".navinside");
//     // console.log(subav.innerText);
//     subav.classList.toggle("active");
//     // console.log(subav.classList);
//   });
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
// navmain.addEventListener("click", (e) => {
//   subav = document.querySelector(".navinside");
//   subav.classList.toggle("active");
//   console.log(subav.classList);
// });
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
// function save_url(){
//     chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//         console.log(tabs[0]);
//         let url = tabs[0].url;
//         if(! localStorage.getItem('playlists')){
//             localStorage['playlists'] = [url];
//         }
//         else{
//             localStorage['playlists'].push(url);
//         }
//     });
//     console.log(localStorage['playlists']);
// }

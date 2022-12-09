const getPlaylistData = async () => {
  var res = chrome.storage.sync.get(null).then(function(items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
    return(allKeys);
});
console.log(res,"llllllll");
return(res);
}

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
  var playlist_data = await getPlaylistData();
  console.log(playlist_data,"fsdf");
  var list = "";
  for(i=0; i<playlist_data.length;i++){
    list+= "<div>"+playlist_data[i]+"</div>";
  }
  list += `<div onclick="var name = prompt('Enter the playlist name');console.log(name); chrome.storage.sync.set({name:name});
  var playl = await getPlaylistData();
  console.log(playl,"fsdf");">Add Playlist</div>`;
  addToPlayList.addEventListener("click", async (e) => {
    console.log(addToPlayList.getElementsByTagName('div')[0], "000000000000000000000000000");
    if( addToPlayList.getElementsByTagName('div')[0] != undefined){
      addToPlayList.getElementsByTagName('div')[0].remove();
    }else{
    let divv = document.createElement("div");
    // divv.className = 
    console.log(list);
    // let list = `
    // <div>jfvbsnodjfnwelfkkkkksfnjknfd ;k</div>
    // <div>Name-2</div>  <div>Name-1</div>
    // <div>Name-2</div>  <div>Name-1</div>
    // <div>Name-2</div>  <div>Name-1</div>
    // <div>Name-2</div>  <div>Name-1</div>
    // <div>Name-2</div>
    // <div>Name-2</div>  <div>Name-1</div>
    // <div>Name-2</div>  <div>Name-1</div>
    // <div>Name-2</div>
    // `;
    divv.style.cssText = "background:#fff; color:#000;padding:10px;font-size:15px;margin:5px auto;position:absolute;bottom:80px;    right: -32px; width: 100px; text-align:left"
    // divv.insertAdjacentHTML('afterbegin',list)
    var playlist_data = await getPlaylistData();
    console.log(playlist_data,"fsdfbiejfanoskdff");
    // var list = "";
    for(i=0; i<playlist_data.length;i++){
      tem_ = document.createElement("div");
      tem_.innerHTML =playlist_data[i];
      // list+= "<div>"+playlist_data[i]+"</div>";
      divv.appendChild(tem_);
    }
    tem_ = document.createElement("div");
    tem_.innerHTML = "Add Playlist";
    divv.appendChild(tem_);
    addToPlayList.appendChild(divv)
    console.log(divv);}
    e.stopPropagation();
  })
});

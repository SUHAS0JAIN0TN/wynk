window.addEventListener("load", function () {
  addToPlayListDiv = document.createElement("div");
  addToPlayList = document.createElement("span");

  addToPlayList.innerHTML = "+";
  addToPlayList.style.cssText =
    "color: rgb(255, 255, 255);font-size: 45px; display: flex; align-items: center;margin-right: 10px;";

  addToPlayListDiv.appendChild(addToPlayList);
  playBar = document.getElementsByClassName(
    "flex-grow text-right mr-4 flex justify-end sm:flex-1 h-full"
  )[0];
  playBar.insertBefore(addToPlayList, playBar.firstChild);
  addToPlayList.addEventListener("click", () => {
    let divv = document.createElement("div");
    addToPlayList.appendChild(divv)
    console.log(divv);
  })
});

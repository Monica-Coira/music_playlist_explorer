const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
   document.getElementById('playlistName').innerText = playlist.playlist_name;
   document.getElementById('playlistImage').src = playlist.playlist_art;
   document.getElementById('playlistCreator').innerText = playlist.playlist_author;
   document.getElementById('listOfSongs').innerHTML = `
      ${playlist.songs.map(song => `
         <div class="songBox">
            <img src="${song.image}" width="200">
            <div class="songLeftContent">
               <div class="songTextContent">
                  <div id="songName">${song.songName}</div>
                  <div>${song.artist}</div>
               </div>
            </div>
            <div class="songDuration">${song.duration}</div>
         </div>
      `).join('')}
   `; 
   modal.style.display = "block";
   shuffleSongs(playlist);
}

span.onclick = function() {
   modal.style.display = "none";
}

window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

const loadPlaylists = () => {
   let deleteCount = 0;
   const container = document.querySelector('.playlist-cards');
   const playlistForm = document.querySelector(".playlist-cards");
   for (const playlist of playlists){
      const elements = createPlaylistElement(playlist);
      container.appendChild(elements);

      document.querySelectorAll('.deleteButton').forEach(button => {
         button.addEventListener('click', (event) => {
            console.log(elements)
            if (deleteCount === 0){
               elements.style.display = "none";
               deleteCount = 1;
            }
         })
      })

      playlistForm.addEventListener('click', (event) => {
         try {
            if (event.target.querySelector('#nameOfPlaylist').innerHTML === playlist.playlist_name) {
               openModal(playlist);
            }
         }
         catch(error){
            console.log("Error");
         }
      })
   }
}

const shuffleSongs = (playlist) => {
   document.querySelectorAll('.shuffleButton').forEach(button => {
      button.addEventListener('click', () => {
         let currentIndex = playlist.songs.length;

         while(currentIndex != 0){
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [playlist.songs[currentIndex], playlist.songs[randomIndex]] = [playlist.songs[randomIndex], playlist.songs[currentIndex]];
         }
         let songListShuffled;
         for (let song of playlist.songs){
            songListShuffled = `
            ${playlist.songs.map(song => `
               <div class="songBox">
                  <img src="${song.image}" width="200">
                  <div class="songLeftContent">
                     <div class="songTextContent">
                        <div id="songName">${song.songName}</div>
                        <div>${song.artist}</div>
                     </div>
                  </div>
                  <div class="songDuration">${song.duration}</div>
               </div>
            `).join('')}
            </div>
            `;
         }
         document.getElementById('listOfSongs').innerHTML = songListShuffled;
      })
   })
}

const updateLike = () => {
   document.querySelectorAll('.likeButton').forEach(button => {
      let isLiked = false;
      const likeContainer = button.querySelector(".likeIcon");
      likeContainer.addEventListener('click', (event) => {
         if (isLiked === false){
            likeContainer.querySelector(".likeCount").innerText = Number(likeContainer.querySelector(".likeCount").innerText) + 1;
            likeContainer.querySelector("#likeIcon").src = "assets/img/heartRed.png";
            isLiked = true;
         }
         else {
            likeContainer.querySelector(".likeCount").innerText = Number(likeContainer.querySelector(".likeCount").innerText) - 1;
            likeContainer.querySelector("#likeIcon").src = "assets/img/heartEmpty.png";
            isLiked = false;
         }
      })
   })
   
}

const createPlaylistElement = (playlist) => {
   console.log(playlist);
   const playlistElement = document.createElement('div');
   playlistElement.id = "playlist-card";
   playlistElement.innerHTML = `
      <img src="${playlist.playlist_art}" alt="Song Cover" width="200">
      <h3 id="nameOfPlaylist">${playlist.playlist_name}</h3>
      <p>Created by ${playlist.playlist_author}</p>
      <div class="cardButtons">
         <div class="likeButton">
            <div class="likeIcon"><img id="likeIcon" src="assets/img/heartEmpty.png" width="13"><span class="likeCount">${playlist.likes}</span></div>
         </div>
         <button class="deleteButton">Delete</button>
      </div>
   `;
   return playlistElement;
}

document.addEventListener("DOMContentLoaded", () => {
   loadPlaylists();
   updateLike();
});

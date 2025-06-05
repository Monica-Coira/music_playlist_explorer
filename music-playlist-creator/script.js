const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
   document.getElementById('playlistName').innerText = playlist.playlist_name;
   document.getElementById('playlistImage').src = playlist.playlist_art;
   document.getElementById('playlistCreator').innerText = playlist.playlist_author;
   document.getElementById('listOfSongs').innerHTML = `<strong>Songs:</strong> ${playlist.songs}`; 
   modal.style.display = "block";
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
   console.log("loading playlists");
   const container = document.querySelector('.playlist-cards');
   const playlistForm = document.querySelector(".playlist-cards");
   for (const playlist of playlists){
      const elements = createPlaylistElement(playlist);
      container.appendChild(elements);
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

const updateLike = () => {
   document.querySelectorAll('.likeButton').forEach(button => {
      let isLiked = false;
      const likeContainer = button.querySelector(".likeIcon");
      likeContainer.addEventListener('click', (event) => {
         if (isLiked === false){
            likeContainer.querySelector(".likeCount").innerText = Number(likeContainer.querySelector(".likeCount").innerText) + 1;
            isLiked = true;
         }
         else {
            likeContainer.querySelector(".likeCount").innerText = Number(likeContainer.querySelector(".likeCount").innerText) - 1;
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
      <p>${playlist.playlist_author}</p>
      <div class="likeButton">
         <div class="likeIcon">♡ <span class="likeCount">${playlist.likes}</span></div>
      </div>
   `;
   return playlistElement;
}

document.addEventListener("DOMContentLoaded", () => {
   loadPlaylists();
   updateLike();
});

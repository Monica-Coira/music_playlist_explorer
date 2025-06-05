const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
   document.getElementById('playlistName').innerText = playlist.playlist_name;
   document.getElementById('playlistImage').src = playlist.playlist_art;
   document.getElementById('playlistCreator').innerText = playlist.playlist_author;
   document.getElementById('listOfSongs').innerHTML = `<strong>Songs:</strong> ${playlist.songs.join(', ')}`;
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
   for (const playlist of playlists){
      const elements = createPlaylistElement(playlist);
      container.appendChild(elements);
   }
}

document.addEventListener("DOMContentLoaded", () => {
   loadPlaylists();
   const playlistForm = document.querySelector("#playlist-card");
   playlistForm.addEventListener('click', openModal(playlist));
});

const createPlaylistElement = (playlist) => {
   console.log(playlist);
   const playlistElement = document.createElement('div');
   playlistElement.id = "playlist-card";
   playlistElement.innerHTML = `
      <img src="${playlist.playlist_art}" alt="Song Cover" width="200">
      <h3>${playlist.playlist_name}</h3>
      <p>${playlist.playlist_author}</p>
      <button>Likes (${playlist.likes})</button>
   `;
   return playlistElement;
}

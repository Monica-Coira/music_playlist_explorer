const featuredPlaylist = (playlists) => {
    const currentFeature = playlists[Math.floor(Math.random() * playlists.length)];
    document.getElementById('featuredName').innerText = currentFeature.playlist_name;
    document.getElementById('featuredImage').src = currentFeature.playlist_art;
    
    document.querySelector('.featured-songs').innerHTML = `
    <div class="featuredSongs">
        ${currentFeature.songs.map(song => `
            <div class="songBox">
                <img src="${song.image}" width="100">
                <div class="song-details">
                    <div id="songName">${song.songName}</div>
                    <div>${song.artist}</div>
                    <div>${song.duration}</div>
                </div>
            </div>
        `).join('')}
    </div>
    `; 
}

document.addEventListener("DOMContentLoaded", () => {
    featuredPlaylist(playlists);
});


const featuredPlaylist = (playlists) => {
    const currentFeature = playlists[Math.floor(Math.random() * playlists.length)];
    document.getElementById('featuredName').innerText = currentFeature.playlist_name;
    document.getElementById('featuredImage').src = currentFeature.playlist_art;
    
    document.querySelector('.featured-songs').innerHTML = `
    <strong>Songs:</strong>
    <div class="featuredSongs">
        ${currentFeature.songs.map(song => `
            <img src="${song.image}" width="200">
            <div>
                <div>${song.songName}</div>
                <div>${song.artist}</div>
                <div>${song.duration}</div>
            </div>
        `).join('')}
    </div>
    `; 
}

document.addEventListener("DOMContentLoaded", () => {
    featuredPlaylist(playlists);
});


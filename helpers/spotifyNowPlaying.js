import spotifyWorker from "~/helpers/spotifyAccessRequest";

export default async function getSong() {
    const response = await spotifyWorker.getNowPlaying()
    console.log('SPOTIFY RESPONSE :')
    console.log(response)

    if (response.status === 204 || response.status > 400) {
        return { isPlaying: false }
    }

    const song = await response.json()

    if (song.item === null) {
        return { isPlaying: false }
    }

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
    const album = song.item.album.name
    const albumImageUrl = song.item.album.images[0].url
    const songUrl = song.item.external_urls.spotify

    // We return an object containing the information about the currently playing song
    return {
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
    }
}

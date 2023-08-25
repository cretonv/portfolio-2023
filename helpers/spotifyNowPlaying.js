import spotifyWorker from "~/helpers/spotifyAccessRequest";

export default async function getSong() {
    const { access_token } = await spotifyWorker.getAccessToken()
    const response = await spotifyWorker.getNowPlaying(access_token)

    if (response.status === 204 || response.status > 400) {
        const historicResponse = await spotifyWorker.getPlayingHistoric(access_token)
        const historic = await historicResponse.json()
        const song = historic.items[0].track
        const title = song.name
        const artist = song.artists.map((_artist) => _artist.name).join(', ')
        const album = song.album.name
        const albumImageUrl = song.album.images[0].url
        const songUrl = song.external_urls.spotify
        return {
            isPlaying: false, album,
            albumImageUrl,
            artist,
            songUrl,
            title,
        }
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

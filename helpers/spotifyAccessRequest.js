import {useRuntimeConfig} from "#app";
import {Buffer} from "buffer";
// https://accounts.spotify.com/authorize?client_id=cb483e990f184740a8604df1ba88e1ee&response_type=code&redirect_uri=http%3A%2F%2localhost:3000&scope=user-read-currently-playing%20user-read-recently-played

const spotifyWorker = {

    getAccessToken: async () => {
        const config = useRuntimeConfig()

        const client_id = config.public.spotifyClientId
        const client_secret = config.public.spotifyClientSecret
        const refresh_token = config.public.spotifyRefreshToken

        const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

        const data = new URLSearchParams();
        data.append("grant_type", "refresh_token");
        data.append("refresh_token", refresh_token);

        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        })
        return response.json()
    },

    getNowPlaying: async (access_token) => {
        const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
        return fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    },

    getPlayingHistoric: async (access_token) => {
        const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`
        return fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    }
}

export default spotifyWorker;

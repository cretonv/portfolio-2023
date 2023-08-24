import {useRuntimeConfig} from "#app";
import {Buffer} from "buffer";

const spotifyWorker = {

    getAccessToken: async () => {
        const config = useRuntimeConfig()

        const client_id = config.public.spotifyClientId
        const client_secret = config.public.spotifyClientSecret
        const refresh_token = config.public.spotifyRefreshToken
        console.log('SPOTIFY KEYS :')
        console.log(client_id)
        console.log(client_secret)
        console.log(refresh_token)

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

    getNowPlaying: async () => {
        const { access_token } = await spotifyWorker.getAccessToken()
        const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
        return fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    }
}

export default spotifyWorker;

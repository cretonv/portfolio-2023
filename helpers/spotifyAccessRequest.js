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

    test: () => {
        const url = "https://accounts.spotify.com/api/token";
        const clientId = "cb483e990f184740a8604df1ba88e1ee";
        const clientSecret = "34ee48ed01ae43239158b970f32bbda0";
        const code = "AQBQ-PRHawsR5L9k_ehqyxCEgJEybbxBnd7SIEEtr17NlOdt9a5JaT5rneCj1_MA3gF4Ry1pg6QiwJ8o5prsDB5xFM6M9GE8wbPs3dopoJjbys1h9jh8VWDD6ycXciAQoFsGeHCibO2EQolNQ-Kb-A0a44epRbLWmrIGRKDspypi7zIcpgI_zYuWJw-rFHDxUUixFtKu9WGkXqM-mYwWFxeR-_H-FAF6K100Iu2uPOJB";
        const redirectUri = "http://localhost:3000"; // Remplacez ceci par votre URL de redirection

        const base64Credentials = btoa(`${clientId}:${clientSecret}`);

        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("code", code);
        data.append("redirect_uri", redirectUri);

        console.log(base64Credentials)

        fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${base64Credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

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

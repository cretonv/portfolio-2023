const spotifyWorker = {
    getAccessToken: () => {
        const url = "https://accounts.spotify.com/api/token";
        const data = new URLSearchParams();
        data.append("grant_type", "client_credentials");
        data.append("client_id", "cb483e990f184740a8604df1ba88e1ee");
        data.append("client_secret", "34ee48ed01ae43239158b970f32bbda0");

        fetch(url, {
            method: "POST",
            headers: {
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
    }
}


export default spotifyWorker;

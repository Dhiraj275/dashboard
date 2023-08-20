gapi.client.init({
    'apiKey': 'AIzaSyBS68Zeu6dKQhKMGarupUHWYroFcBGg_xM',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': '795782647245-eepi5smq157gi6gg1acbee4buu6v43o0.apps.googleusercontent.com',
    'scope': 'profile',
}).then(() => {
    gapi.client.load(
        'https://analyticsreporting.googleapis.com/$discovery/rest',
        'v4'
    ).then((e)=>{
        console.log(e)
    })
})

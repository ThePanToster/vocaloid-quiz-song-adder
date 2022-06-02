const getSongList = () => {
    const fs = require('fs')

    try {
        let rawdata = fs.readFileSync('./songs/songs.json')
        return JSON.parse(rawdata)
    }
    catch (error) {
        console.log('Something went wrong while reading a file')
        return false
    }
}

const addSongToList = (song) => {
    const fs = require('fs')
    var songs = getSongList()

    if (songs){
        songs.push(song)
        let data = JSON.stringify(songs, null, 4)
        fs.writeFileSync('./songs/songs.json', data)
    }
}

const generateContent = () => {
    let songs = getSongList()
    var output = ""
    songs.forEach(song => {
        var voices = song.voices
        if (typeof song.voices != "string" && song.voices.length>1){
            voices = song.voices[0]
            song.voices.forEach(element => {
                if (element!=voices){
                    voices += ", "+element
                }
            })
        }
        output += '<div id="song'+song.number+'" class="song"><div class="title">#'+song.number+' - <a href="'+song.link+'" target="_blank">'+song.name+'</a></div><div class="dif">'+song.difficulty+'</div><div>Starring: '+voices+'</div><div>Made by: '+song.producer+'</div><div class="date">'+song.published+'</div></div>'
    })
    return output
}

const generateSongNumber = () => {
    let songs = getSongList()
    return songs.length + 1
}

const getAlertType = (status) => {
    if (status){
        switch (status) {
            case "success":
                return '<p id="alert">Added successfully</p>'
            default:
                return '<p id="alert">Something went wrong</p>'
        }
    }
    else{
        return ""
    }
}

module.exports = {
    generateContent,
    generateSongNumber,
    addSongToList,
    getAlertType
}
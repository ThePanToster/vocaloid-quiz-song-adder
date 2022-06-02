const express = require('express')
const content = require('./pagelogic')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000


const app = express()
app.set('view engine', 'hbs')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.render('index', {
        songDB: content.generateContent(),
        nextSongNo: content.generateSongNumber(),
        alert: content.getAlertType(req.query.status)
    })
})

app.post('/addsong', (req, res) => {

    var song = req.body

    content.addSongToList(song)
    
    res.send('<meta http-equiv="Refresh" content="0; url=\'/?status=success\'" />')

})

app.listen(port)
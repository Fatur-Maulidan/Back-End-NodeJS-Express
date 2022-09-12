// Import Express and Mangoose
const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:users");

const app = express()
let User = mongoose.model("User", nameSchema);

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }),)


// Create field firstname dan lastname
var nameSchema = new mongoose.Schema({
  firstName: String,
  password: String
});

// Landing Page
app.get('/', (req, res) => {
  res.json({
    nama: 'Fatur Maulidan',
    noHP: '0812212112'
  })
})


// Create login API
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (username == 'Fatur' && password == 123456)
        res.send(`Selamat Datang ${username}`)
    else
        res.send('Username dan password salah')
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
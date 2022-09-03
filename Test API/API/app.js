const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }),)

app.get('/', (req, res) => {
  res.json({
    nama: 'Fatur Maulidan',
    noHP: '0812212112'
  })
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username == 'Fatur' && password == 123456)
        res.send(`Selamat Datang ${username}`)
    else
        res.send('Username dan password salah')

})

app.get('/about', (req, res) => {
    res.send('Ini adalah halaman About!')
})

app.get('/kontak', (req, res) => {
    res.send('Ini adalah Contact!')
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
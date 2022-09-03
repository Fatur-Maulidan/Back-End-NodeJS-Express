const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

// Create variable named books 
let books = []

app.use(cors())

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const data = req.body

    res.send('Book is added to the database')
})

app.listen(port, () => {console.log(`listening on port ${port}`)})

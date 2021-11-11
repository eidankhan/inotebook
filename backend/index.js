// Express Server code goes in this file

const connectoMongodb = require('./db');
const express = require('express')

connectoMongodb();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Eidan!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
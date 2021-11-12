// Express Server code goes in this file

const connectoMongodb = require('./db');
const express = require('express')

connectoMongodb();
const app = express()
const port = 3000

app.use(express.json())

// AVAILABLE ROUTES
app.use('/api/auth/createUser', require('./routes/authorization'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Eidan!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
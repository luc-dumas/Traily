const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')
const app = express()
const path = require('path')

var cors = require('cors')

app.use(cors())

dotenv.config()
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongodb connected!')
  })
  .catch((err) => {
    console.log(err)
  })

app.use('/api/pins', pinRoute)
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
  res.send('app is running')
})

app.listen(process.env.PORT || 6800, () => {
  console.log('Backend server is running...')
})

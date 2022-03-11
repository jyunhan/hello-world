const { Server } = require('socket.io')
const http = require('http')
const express = require('express')
const existHander = require('./exitHandler')
const axios = require('axios')
// const { createTerminus } = require('@godaddy/terminus')

const app = express()

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/pub', (req, res) => {
  const randomNumber = Math.floor(Math.random()*10)
  socket.emit('hello', `world ${randomNumber}`)
  console.log('hello', `world ${randomNumber}`)
})

const server = app.listen(3033, () => {
  console.log('server start...')
})

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  // socket.emit('hello', 'test')
  setInterval(async () => {
    const { data } = await axios({
      method: 'GET',
      url: 'https://api.binance.com/api/v3/depth?symbol=ETHBTC&limit=1',
    })

    socket.emit('hello', JSON.stringify(data))
  }, 2500)

  socket.on('howdy', (arg) => {
    console.log(arg)
  })
})

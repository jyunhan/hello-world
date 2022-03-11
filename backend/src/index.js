const { Server } = require('socket.io')
const http = require('http')
const express = require('express')
const existHander = require('./exitHandler')
const axios = require('axios')
const dotenv = require('dotenv').config()
const config = require('../config')

const { ORDER_AMOUNT, SYMBOL } = config

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
  // reconnection: false,
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

const bidRequests = (bidTarget, bids) => {
  let bidRemain = bidTarget
  let requestLists = []

  // No use Array function, unless allow low performance here
  for (let idx = 0; idx < bids.length; idx++) {
      const list = bids[idx]
      const price = parseFloat(list[0])
      const size = parseFloat(list[1])
      const amount = price * size
      
      if (bidRemain < amount) {
        break
      }

      bidRemain = bidRemain - amount
      requestLists.push(list.slice().concat([amount.toString()]))
  }

  return requestLists
}

const askRequests = (askTarget, asks) => {
  let askRemain = askTarget
  let requestLists = []

  // No use Array function, unless allow low performance here
  for (let idx = 0; idx < asks.length; idx++) {
      const list = asks[idx]
      const price = parseFloat(list[0])
      const size = parseFloat(list[1])
      const amount = price * size
      
      if (askRemain < size) {
        break
      }

      askRemain = askRemain - size
      requestLists.push(list.slice().concat([amount.toString()]))
  }

  return requestLists
}

io.on('connection', (socket) => {
  const theInterval = setInterval(async () => {
    const { data } = await axios({
      method: 'GET',
      url: `https://api.binance.com/api/v3/depth?symbol=${SYMBOL}&limit=${ORDER_AMOUNT}`,
    })

    const bidTarget = 5
    const askTarget = 150
    const bids = bidRequests(bidTarget, data.bids)
    const asks = askRequests(askTarget, data.asks)
    
    const result = Object.assign({}, data, {
      bids,
      asks,
    })

    socket.emit('hello', JSON.stringify(result))
  }, 500)

  socket.on("disconnecting", (reason) => {
    // KEEP EMPTY
  })

  socket.on("disconnect", (reason) => {
    socket.disconnect()
    clearInterval(theInterval)
  })

  socket.on('howdy', (arg) => {
    console.log(arg)
  })
})

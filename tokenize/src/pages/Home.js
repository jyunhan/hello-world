import BoardWrapper from '../component/BorderWrapper'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background

const Container = styled.div`
  height: 100vh;
`

function Home () {
  const [isSocketIoSet, setIsSocketIoSet] = useState(false)
  const [socketIo, setSocketIo] = useState(undefined)
  const [bidList, setBidList] = useState([])

  // TODO: modulize socket-client establishment
  useEffect(() => {
    if (isSocketIoSet && socketIo) {
      socketIo.on('hello', (bidList) => {
        setBidList(bidList)
      })
    }
    else {
      setSocketIo(io('ws://localhost:3033', { transports: ["websocket"] }))
      setIsSocketIoSet(true)
    }
    // socket.emit('howdy', 'stranger')
  }, [isSocketIoSet])

  useEffect(() => {
    if (bidList.length > 0) {
      console.log(bidList + new Date().toISOString())
    }
  }, [bidList])

  return !isSocketIoSet ? null : (
    <Container>
      <BoardWrapper/>
    </Container>
  )
}

export default Home

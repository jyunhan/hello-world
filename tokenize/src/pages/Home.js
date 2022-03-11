import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { connect } from 'react-redux'
import BoardWrapper from '../component/BorderWrapper'
import { updateBidList } from '../actions'

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background

const Container = styled.div`
  height: 100vh;
`

function Home (state) {
  const [isSocketIoSet, setIsSocketIoSet] = useState(false)
  const [socketIo, setSocketIo] = useState(undefined)

  // TODO: modulize socket-client establishment
  useEffect(() => {
    if (isSocketIoSet && socketIo) {
      socketIo.on('hello', (request) => {
        const { bids, asks, updateId } = JSON.parse(request)
        state.updateBidList(bids)
      })
    }
    else {
      setSocketIo(io('ws://localhost:3033', { transports: ["websocket"] }))
      setIsSocketIoSet(true)
    }
  }, [isSocketIoSet])

  useEffect(() => {
    console.log(state.bidList)
  }, [state.bidList])

  return !isSocketIoSet ? null : (
    <Container>
      <BoardWrapper/>
    </Container>
  )
}

const mapStateToProps = state => {
  return ({
    bidList: state.bidList
  })
}

const mapDispatchToProps = dispatch => {
  return {
    updateBidList: bidList => {
      return dispatch(updateBidList(bidList))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)


import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { connect } from 'react-redux'
import BoardWrapper from '../component/BorderWrapper'
import { updateBidList } from '../actions'

const Container = styled.div`
  height: 100vh;
`

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

  return !isSocketIoSet ? null : (
    <Container>
      <BoardWrapper bidList={state.bidList} />
    </Container>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)


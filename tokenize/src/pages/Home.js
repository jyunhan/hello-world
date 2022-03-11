import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { connect } from 'react-redux'
import BoardWrapper from '../component/BorderWrapper'
import { updateBidList, updateAskList } from '../actions'

const Container = styled.div`
  height: 100vh;
`

const mapStateToProps = state => {
  return ({
    bidList: state.bidList,
    askList: state.askList,
  })
}

const mapDispatchToProps = dispatch => {
  return {
    updateBidList: bidList => {
      return dispatch(updateBidList(bidList))
    },
    updateAskList: askList => {
      return dispatch(updateAskList(askList))
    }
  }
}

function Home (state) {
  const [isSocketIoSet, setIsSocketIoSet] = useState(false)
  const [socketIo, setSocketIo] = useState(undefined)

  // TODO: modulize socket-client establishment
  useEffect(() => {
    if (isSocketIoSet || socketIo) {
      socketIo.on('hello', (request) => {
        const { bids, asks, updateId } = JSON.parse(request)
        state.updateBidList(bids)
        state.updateAskList(asks)
      })
    }
    else {
      const socket = io('ws://localhost:3033', { transports: ["websocket"] })
      setSocketIo(socket)

      socket.on("connect", () => {
        console.log('socketIo ID: ' + socket.id)
      });

      socket.on("disconnect", () => {
        console.log(socket.connected); // false
      });

      setIsSocketIoSet(true)
    }
  }, [isSocketIoSet])

  return !isSocketIoSet ? null : (
    <Container>
      <BoardWrapper bidList={state.bidList} askList={state.askList} />
    </Container>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)


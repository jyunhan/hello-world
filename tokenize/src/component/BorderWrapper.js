import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const BoardWrapper = styled.div`
  max-width: 1024px;
  min-width: 22em;
  display: flex;
  flex-flow: column nowrap;  
  overflow: auto;
  margin: auto;
  margin-top: 2em;
`

const Row = styled.div`
  display: flex;
	flex-flow: row nowrap;
	justify-content: left;
  align-items: left;
`

const Th = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0;
  flex-shrink: 0;
`

const UpdateDateTimeRow = styled(Row)`
  border: 1px solid #d6d1d1;
  height: 2em;
`

const Board = styled(Th)`
  flex: 1;
  border: 1px solid darkgray;
  min-height: 200px;
  margin: 0px 2rem;
  margin-top: 1rem;
  justify-content: start;
  flex-direction: column;
`

const BoardList = styled.div`
  width: 95%;
  height: 30px;
  display: flex;
  align-items: center;
`

const LeftColumn = styled.div`
  flex: 1;
`

const RightColumn = styled.div`
  flex: 1;
  text-align: right;
  padding-right: 2px;
`

const ListRow = ({ data: { type, list } }) => {
  return list.map((data, idx) => {
    const price = data[0]
    const amount = data[1]
    return (
      <BoardList key={idx}>
        <LeftColumn> { type === 'bid' ? amount : price } </LeftColumn>
        <RightColumn> { type === 'bid' ? price : amount } </RightColumn>
      </BoardList>
    )
  })
}

export default ({ bidList, askList }) => {
  return (
    <BoardWrapper>
      <UpdateDateTimeRow/>
      <Row>
        <Board>
          <ListRow data={{type: 'bid', list: bidList}} />
        </Board>
        <Board>
          <ListRow data={{type: 'ask', list: askList}} />
        </Board>
      </Row>
    </BoardWrapper>
  )
}
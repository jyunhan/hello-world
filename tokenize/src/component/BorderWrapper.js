import React from 'react'
import styled from 'styled-components'

const BoardWrapper = styled.div`
  max-width: 800px;
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
  display: flex;
  border: 1px solid #d6d1d1;
  height: 2em;
  align-items: center;
  justify-content: center;
`

const Board = styled(Th)`
  flex: 1;
  border: 1px solid #d6d1d1;
  min-height: 400px;
  margin: 0px 2rem;
  margin-top: 1rem;
  justify-content: start;
  flex-direction: column;
  background: #eef7ee;
`

const BoardList = styled.div`
  width: 95%;
`

const BoardTitleList = styled(BoardList)`
  height: 50px;
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

const LeftBoard = styled(Board)`
  border-left: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`

const RightBoard = styled(Board)`
  border-right: 0px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

const InnerRow = styled.div`
  height: 2em;
  flex-flow: row;
  display: flex;
  width: 100%;
`

const ValueColumn = styled.div`
  width: 100%;
  font-size: 12px;
  text-align: right;
  color: #a39090;
`

const BoardTitle = ({data: {position}}) => {
  return (
    <BoardTitleList>
      <LeftColumn> { position === 'left' ? 'Size' : 'Ask' } </LeftColumn>
      <RightColumn> { position === 'left' ? 'Bid' : 'Size' } </RightColumn>
    </BoardTitleList>
  )
}

const ListRow = ({data: { type, list }}) => {
  return list.map((data, idx) => {
    const price = data[0]
    const size = data[1]
    const value = data[2]
    return (
      <BoardList key={idx}>
        <InnerRow>
          <LeftColumn> { type === 'bid' ? size : price } </LeftColumn>
          <RightColumn> { type === 'bid' ? price : size } </RightColumn>
        </InnerRow>
        <InnerRow>
          <ValueColumn>
            { value }
          </ValueColumn>
        </InnerRow>
      </BoardList>
    )
  })
}

export default ({ bidList, askList }) => {
  return (
    <BoardWrapper>
      <UpdateDateTimeRow>
        Tokenize AmazinTech.
      </UpdateDateTimeRow>
      <Row>
        <LeftBoard>
          <BoardTitle data={{position: 'left'}} />
          <ListRow data={{type: 'bid', list: bidList}} />
        </LeftBoard>
        <RightBoard>
          <BoardTitle data={{position: 'right'}} />
          <ListRow data={{type: 'ask', list: askList}} />
        </RightBoard>
      </Row>
    </BoardWrapper>
  )
}
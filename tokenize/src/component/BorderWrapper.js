import React from 'react'
import styled from 'styled-components'
import depth from '../mock_data/depth.json'

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

const SizeColumn = styled.div`
  flex: 1;

`

const AmountColumn = styled.div`
  flex: 1;
  text-align: right;
  padding-right: 2px;
`

const ListRow = ({ data: { type, list } }) => {
  let mockData = type === 'ask' ? [
    ['0.1234', '0.9876'],
    ['QAQ', 'zzzz'],
    ['QAQ', 'zzzz'],
    ['QAQ', 'zzzz'],
    ['QAQ', 'zzzz'],
  ] : list

  return mockData.map((data, idx) => {
    return (
      <BoardList key={idx}>
        <SizeColumn>
          ${data[0]}
        </SizeColumn>
        <AmountColumn>
        ${data[1]}
        </AmountColumn>
      </BoardList>
    )
  })
}

export default ({ bidList, askList = [] }) => {
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
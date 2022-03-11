export const updateBidList = bidList => {
  return ({
    type: 'UPDATE_BIDLIST',
    data: {
      bidList
    }
  })
}

export const updateAskList = askList => {
  return ({
    type: 'UPDATE_ASKLIST',
    data: {
      askList
    }
  })  
}

const initState = {
  bidList: [],
  askList: [],
}

const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_BIDLIST':
      return Object.assign({}, state, {
        bidList: action.data.bidList
      })
    // case 'UPDATE_ASKLIST':
    //   console.log(state)
    //   return action.askList
    default:
      return state;
  }
}

export default homeReducer

const initState = {
  bidList: [],
}

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.bidList
    default:
      return state;
  }
}

export default todoReducer

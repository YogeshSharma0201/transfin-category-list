export default (state = {}, action) => {
 switch (action.type) {
  case 'SIMPLE_ACTION':
    return {
      result: {
        ...state.result,
        ...action.payload
      }
    }
  case 'CHANGE_CATEGORY':
    return {
      result: {
        ...state.result,
        posts: [],
        posts_count: 0,
        offset: 0,
        fetching: true
      }
    }
  default:
   return state
 }
}

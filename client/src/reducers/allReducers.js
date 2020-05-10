export const currentPlayerReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_CURRENT_PLAYER': 
      return action.player
    default: 
      return state
  }
}

export const currentUrlSpartanReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_URL_SPARTAN':
      return action.url
    default:
      return state  
  }
}
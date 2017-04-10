//type of message
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

//action of message
export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
})

export const deleteMessage = (messageID) => ({
  type: DELETE_MESSAGE, 
  messageID
})

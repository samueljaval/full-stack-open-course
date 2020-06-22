import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesReducer = (state = [], action) => {

  switch(action.type){
      case "VOTE" :
        const toChange = state.find(n => n.id === action.data.id)
        const changed = {
            ...toChange,
            votes : toChange.votes + 1
        }
        return state.map(x => x.id === action.data.id ? changed : x)
      case "CREATE":
        return [
            ...state, action.data
        ]
      case "INIT" :
        return action.data
      default:
        return state
  }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        await anecdoteService.createNew(content)
        dispatch({
            type : "CREATE",
            data : {
                content,
                votes: 0,
                id: getId()
            }
        })
    }
}

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        anecdoteService.change(anecdote.id, anecdote.content, anecdote.votes + 1)
        dispatch({
            type : "VOTE",
            data : {id : anecdote.id}
        })
    }
}

export const initialize = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: "INIT",
            data: anecdotes
        })
    }
}

export default anecdotesReducer

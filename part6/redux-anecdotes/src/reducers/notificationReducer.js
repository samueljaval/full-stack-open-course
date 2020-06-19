const initial = ""

const notificationReducer = (state = initial, action) => {
    // console.log('state now: ', action.data)
    switch (action.type){
        case "VOTED":
            return action.data
        case "ADDED":
            return action.data
        case "RESET":
            return initial
        default :
            return state
    }
}

export const voted = (anecdote) => {
    return {
        type : "VOTED",
        data : {message : `one vote was added in favour of "${anecdote}"`}
    }
}


export const added = (anecdote) => {
    return {
        type : "ADDED",
        data : {message : `${anecdote} was added to the list`}
    }
}

export default notificationReducer

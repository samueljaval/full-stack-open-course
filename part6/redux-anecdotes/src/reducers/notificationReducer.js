const initial = ""

var timeoutId

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

export const setNotification = (text, time) => {
    return async dispatch => {
        clearTimeout(timeoutId)
        dispatch({
            type : "VOTED",
            data : {message : text}
        })
        timeoutId = setTimeout(()=>dispatch({type:"RESET"}), time)
    }
}

export default notificationReducer

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

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch({
            type : "VOTED",
            data : {message : text}
        })
        setTimeout(()=>dispatch({type:"RESET"}), time)
    }
}

export default notificationReducer

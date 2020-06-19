const initial = ""

const filterReducer = (state = initial, action) => {
    switch (action.type) {
        case "CHANGE":
            return action.data.filter
        default :
            return state
    }
}

export const changed = (filter) => {
    return {
        type : "CHANGE",
        data : {filter : filter}
    }
}

export default filterReducer

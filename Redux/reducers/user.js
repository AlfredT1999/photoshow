const initialState = {
    currentUser = null
}

// The parameter action has the next function:
// it will be passed an action object as an argument.
export const user = (state = initialState, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}
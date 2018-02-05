import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    todo: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload,
                flag: state.flag
            })
        case ActionTypes.TODO:
            return ({
                ...state,
                todo: state.todo.concat(action.payload),
                flag: state.flag
            })
        case ActionTypes.DELETETODO:
            state.todo.splice(action.payload, 1)
            return ({
                todo: state.todo.concat(),
                flag: state.flag
            })
        case ActionTypes.EDITTODO:
            state.todo[action.index].todo = action.payload
            state.todo[action.index].flag = false
            return ({
                ...state,
                todo: state.todo.concat()
            })
        case ActionTypes.UPDATETODO:
            state.todo[action.index].todo = action.payload
            state.todo[action.index].flag = true
            return ({
                ...state,
                todo: state.todo.concat()
            })
        case ActionTypes.DELETEALLTODO:
            return ({
                todo: []
            })
        default:
            return state;
    }
}
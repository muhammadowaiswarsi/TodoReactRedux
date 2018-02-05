import ActionTypes from '../constant/constant';
import * as firebase from 'firebase';



// Initialize Firebase
var config = {
    apiKey: "AIzaSyA8dX3TDscJruAmlplziyL7s-V7ZLNrSm0",
    authDomain: "todoapplication-1.firebaseapp.com",
    databaseURL: "https://todoapplication-1.firebaseio.com",
    projectId: "todoapplication-1",
    storageBucket: "todoapplication-1.appspot.com",
    messagingSenderId: "578816698058"
};
firebase.initializeApp(config);



export function changeUserName(get) {
    return dispatch => {
        let todo = {
            todo: get,
            flag: true
        }
        firebase.database().ref('/').child("todo").push(todo)
    }
}


export function forData() {
    return dispatch => {
        firebase.database().ref('/').child("todo").on("child_added", function (data) {
            var obj = data.val();
            obj.id = data.key;
            dispatch({ type: ActionTypes.TODO, payload: obj })
        })
    }
}


export function Delete(id, ind) {
    return dispatch => {
        firebase.database().ref('/').child(`todo/${id}`).remove();
        dispatch({ type: ActionTypes.DELETETODO, payload: ind })
    }

}

export function deleteall() {
    return dispatch => {
        firebase.database().ref("/").child(`name`).remove()
        dispatch({ type: ActionTypes.DELETEALLTODO })
    }

}

export function edit(ind) {
    return dispatch => {
        dispatch({ type: ActionTypes.EDITTODO, index: ind })
    }
}
export function updateTodo(val, id, ind) {
    return dispatch => {
        firebase.database().ref('/').child(`todo/${id}`).update({ todo: val })
        dispatch({ type: ActionTypes.UPDATETODO, payload: val, index: ind })
    }
}
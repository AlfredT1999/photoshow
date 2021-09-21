import firebase from 'firebase'
import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE} from '../constants/index'

export function fetchUser(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {// a snapshot is the state of a system at a particular point in time.
            if(snapshot.exists){// The exists() method is part of the snapshot object which is returned by firebase queries.
                console.log(snapshot.data());
                dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
            }
            else{
                console.log("does not exist");
            }
        })
    })
}

export function fetchUserPosts(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")// order the date to the latest to first.
        .get()
        .then((snapshot) => {// a snapshot is the state of a system at a particular point in time.
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;

                return {id, ...data}
            })

            console.log(posts);
            dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
        })
    })
}
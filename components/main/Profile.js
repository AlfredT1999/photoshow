import React, { useState, useEffect }from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import firebase from 'firebase'
require('firebase/firestore')

function Profile(props) {
    const [userPost, setUserPosts] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const {currentUser, posts} = props;
        console.log({currentUser, posts});

        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        }
        else{
            firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {// a snapshot is the state of a system at a particular point in time.
                if(snapshot.exists){// The exists() method is part of the snapshot object which is returned by firebase queries.
                    setUser(snapshot.data());
                }
                else{
                    console.log("does not exist");
                }
            })
            firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid )
            .collection("userPosts")
            .orderBy("creation", "asc")// order the date to the latest to first.
            .get()
            .then((snapshot) => {// a snapshot is the state of a system at a particular point in time.
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;

                    return {id, ...data}
                })

                setUserPosts(posts);
            })
        }
    }, [props.route.params.uid]);

    if(user === null){
        return <View>User null</View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
            </View>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPost}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile)

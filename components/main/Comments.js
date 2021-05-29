import React, { useState, useEffect } from 'react'
import {SafeAreaView, RefreshControl, View, Text, FlatList, Button, TextInput, ScrollView } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserPosts } from '../../redux/actions'
import {Restart} from 'fiction-expo-restart';

function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")
    const {currentUser} = props;
    const username = currentUser.username

    useEffect(() => {
        /*  
        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        } */


        
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setComments(comments)
                })
            setPostId(props.route.params.postId)
         /* else {
            matchUserToComment(comments)
        } */
    }, [props.route.params.postId])


    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text,
                username
            })
    }

    const deleteComment = (commentId) => {
        firebase.firestore().collection('posts')
        .doc(props.route.params.postId)
        .collection('comments')
        .doc(commentId)
        .delete()
        .then(() => {
            console.log('Comment deleted');
          })
}

    return (
        <View>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View>
                            <Text>
                                {item.username}
                            </Text>
                        <Text>{item.text}</Text>
                        <Button
                    title="Delete"
                    onPress={() => deleteComment(item.id)}
                />
                    </View>
                )}
                
            />

            <View>
                <TextInput
                    placeholder='comment...'
                    onChangeText={(text) => setText(text)} />
                <Button
                    onPress={() => onCommentSend()}
                    title="Send"
                />
            </View>

        </View>
    )
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
})
//const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps)(Comment);
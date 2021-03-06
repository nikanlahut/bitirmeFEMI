import React, { useState } from 'react';
import{View,Button,TextInput} from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';



function Add(props){
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [description, setDescription] = useState("")
    const {currentUser} = props
    const username = currentUser.username

    const onAdd = () => {
        const uid = firebase.auth().currentUser.uid
        firebase.firestore().collection('posts')
            .add({
                title,
                topic,  
                description,
                uid,
                username,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            })
        .catch((error) => {
            console.log(error)
        })
    }


        return (
            <View>
                <TextInput
                    placeholder='title'
                    onChangeText={(title) => setTitle(title)}  
                
                />
                <TextInput
                    placeholder='topic'
                    onChangeText={(topic) => setTopic(topic)}  
                
                />
                <TextInput
                    placeholder='description'
                    onChangeText={(description) => setDescription(description)}  
                
                />

                <Button
                    onPress={() => onAdd()}
                    title='Post'
                />
            </View>
        )
    }




const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
  })
export default connect(mapStateToProps, null)(Add);

import React, { Component } from 'react'
import{View,Button,TextInput} from 'react-native'
import firebase from 'firebase'
import 'firebase/auth';
import { useNavigation } from '@react-navigation/native';



export class Add extends Component {
    constructor(props){

        super(props)
        this.state = {

            title: '',
            topic: '',
            description: '',
            
        }

        
    }
    onAdd(){
        const { title, topic, description } = this.state;
        const uid = firebase.auth().currentUser.uid
        firebase.firestore().collection('posts')
            .add({
                title,
                topic,
                description,
                uid
                
            })
        .catch((error) => {
            console.log(error)
        })

    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder='title'
                    onChangeText={(title) => this.setState({ title })}  
                
                />
                <TextInput
                    placeholder='topic'
                    onChangeText={(topic) => this.setState({ topic })}  
                
                />
                <TextInput
                    placeholder='description'
                    onChangeText={(description) => this.setState({ description })}  
                
                />

                <Button
                    onPress={() => this.onAdd()}
                    title='Post'
                />
            </View>
        )
    }
}

export default Add

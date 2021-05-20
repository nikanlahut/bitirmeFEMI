import React, { Component } from 'react'
import{View,Button,TextInput} from 'react-native'
import firebase from 'firebase'
import 'firebase/auth';


export class SignUp extends Component {
    constructor(props){

        super(props)
        this.state = {

            email: '',
            username: '',
            password: '',
            
        }

        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp(){
        const { email, username, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                username,
                email,
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder='email'
                    onChangeText={(email) => this.setState({ email })}  
                
                />
                <TextInput
                    placeholder='username'
                    onChangeText={(username) => this.setState({ username })}  
                
                />
                <TextInput
                    placeholder='password'
                    onChangeText={(password) => this.setState({ password })}  
                    secureTextEntry={true}
                
                />

                <Button
                    onPress={() => this.onSignUp()}
                    title='Sign Up'
                />
            </View>
        )
    }
}

export default SignUp

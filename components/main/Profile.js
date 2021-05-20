import React from 'react'
import { View , Text,useState,useEffect, FlatList} from 'react-native'
import {fetchUser} from '../../redux/actions/index'
import firebase from 'firebase';


export default function Profile(navigation) {
    const [loading, setLoading] = React.useState(true); // Set loading to true on component mount
    const [posts, setPosts] = React.useState([]); // Initial empty array of users
    
    React.useEffect(() => {
      const uid = firebase.auth().currentUser.uid
        const subscriber = firebase.firestore()
          .collection('posts')
          .where('uid', '==', uid)
          .onSnapshot(querySnapshot => {
            const posts = [];
      
            querySnapshot.forEach(documentSnapshot => {
                posts.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setPosts(posts);
            setLoading(false);
            console.log()
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);
    
    
      return (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Title: {item.title}</Text>
              <Text>Topic: {item.topic}</Text>
            </View>
          )}
        />
      )
}
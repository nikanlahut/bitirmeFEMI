import React from 'react'
import { View , Text,useState,useEffect, FlatList} from 'react-native'
import firebase from 'firebase';

export default function Feed() {
    const [loading, setLoading] = React.useState(true); // Set loading to true on component mount
    const [users, setUsers] = React.useState([]); // Initial empty array of users
    
    React.useEffect(() => {
        const subscriber = firebase.firestore()
          .collection('incidents')
          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setUsers(users);
            setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);
    
    
      return (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>name: {item.name}</Text>
              <Text>age: {item.age}</Text>
              <Text>when: {item.when}</Text>
              <Text>where: {item.where}</Text>
              <Text>why: {item.why}</Text>
            </View>
          )}
        />
      )
}

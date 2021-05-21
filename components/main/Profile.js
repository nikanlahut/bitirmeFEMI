import React from 'react'
import { StyleSheet, View , Text,useState,useEffect, FlatList, Button} from 'react-native'
import {fetchUser} from '../../redux/actions/index'
import firebase from 'firebase';
import { connect } from 'react-redux';


function Profile(props) {
    const [loading, setLoading] = React.useState(true); // Set loading to true on component mount
    const [posts, setPosts] = React.useState([]); // Initial empty array of users
    const {currentUser} = props;
    
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

      const onLogout = () => {
        firebase.auth().signOut();
    }
    
    
      return (
        <View style={styles.container}>
        <View style={styles.containerInfo}>
            <Text>{currentUser.username}</Text>
            <Text>{currentUser.email}</Text>
                <Button
                    title="Logout"
                    onPress={() => onLogout()}
                />
        </View>
        <View style={styles.containerGallery}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Title: {item.title}</Text>
              <Text>Topic: {item.topic}</Text>
            </View>
          )}
        />
        </View>
        </View>
      )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  containerInfo: {
      margin: 20
  },
  containerGallery: {
      flex: 1
  }
})
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
})

export default connect(mapStateToProps, null)(Profile);
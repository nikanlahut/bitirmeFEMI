import React from 'react'
import { View , Text,useState,useEffect, FlatList} from 'react-native'
import firebase from 'firebase';
import { connect } from 'react-redux';
import { fetchUserPosts } from '../../redux/actions';

function Forum(props) {
    const [loading, setLoading] = React.useState(true); // Set loading to true on component mount
    //const [posts, setPosts] = React.useState([]); // Initial empty array of users
    const {posts} = props;

    
   /*
    React.useEffect(() => {
      const uid = firebase.auth().currentUser.uid
        const subscriber = firebase.firestore()
          .collection('posts')
          .orderBy("creation", "desc")
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
      */
    
      return (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>title: {item.title}</Text>
              <Text>topic: {item.topic}</Text>
              <Text>description: {item.description}</Text>
              <Text>username: {item.username}</Text>
              <Text
              onPress = {()=>
               props.navigation.navigate('Comment',
              {postId: item.id})}>
              See Comments
            </Text>
            </View>
           
          )}
        />
      )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
})

export default connect(mapStateToProps, null)(Forum);
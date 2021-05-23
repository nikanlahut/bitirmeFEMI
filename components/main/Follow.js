import React, { useState, useEffect } from 'react'
import { View , Text,FlatList, Button} from 'react-native'
import firebase from 'firebase';
import { connect } from 'react-redux';
import { fetchUserPosts } from '../../redux/actions';

function Follow(props) {
    const [posts, setPosts] = React.useState([])
    const [falove, setFalove] = React.useState([])
    const uid = firebase.auth().currentUser.uid
    const [total, setTotal] = React.useState([])







    React.useEffect(() => {
       firebase.firestore() 
        .collection('following')
        .where('uid', '==', uid)
        .onSnapshot(querySnapshot => {
            const falove = [];
            querySnapshot.forEach(documentSnapshot =>
                falove.push({
                    ...documentSnapshot.data(),
                    key:documentSnapshot.id,
                })
                )
                setFalove(falove)

            }
            )
            firebase.firestore()
            .collection('posts')
            .onSnapshot(querySnapshot => {
              const posts = [];
        
              querySnapshot.forEach(documentSnapshot => {
                  posts.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                  })
                ;
              });
        
              setPosts(posts);
            })

            

        }, []);

        const showFollowedPosts = () => {
            const total = []
        for (var i = 0; i < falove.length; i++) {
            for (var j = 0; j < posts.length; j++) {
              if (falove[i].followed == posts[j].key) { 
                  total.push(posts[j])
            }
          }
        }
        setTotal(total)
    }

    const unfollow = (postId) => {
      firebase.firestore().collection('following')
      .where('followed', '==', postId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        })
      })
}

      return (
        <View>
        <View>
                <Button
                    title="Show Followed Posts"
                    onPress={() => showFollowedPosts()}
                />
        </View>
        <View>
        <FlatList
          data={total}
          renderItem={({ item }) => (
            <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>title: {item.title}</Text>
              <Text>topic: {item.topic}</Text>
              <Text>description: {item.description}</Text>
              <Text>username: {item.username}</Text>
              <Button
              title= "Comments"
              onPress = {()=>
               props.navigation.navigate('Comment',
              {postId: item.key})}
              See Comments
            />
            <Text>    </Text>
              <Button
                    title="Unfollow"
                    onPress={() => unfollow(item.key)}
                />
                <Text> ----- </Text>
            </View>
            
          )}
        />
        </View>
        </View>
      )
              }

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
})

export default connect(mapStateToProps, null)(Follow);
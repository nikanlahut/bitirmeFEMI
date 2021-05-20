import React, { Component } from 'react'
import { View, Text } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUser} from '../redux/actions/index'


import FeedScreen from './main/Feed'
import Profile from './main/Profile'
import Forum from './main/Forum'
import ProfileStack from './ProfileStack'
import ForumStack from './ForumStack'

const Tab = createBottomTabNavigator();
const Empty=() => {
    return(null)
}
export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        return (
            
            <Tab.Navigator initialRouteName='Feed'>
                <Tab.Screen name ='Feed' component={FeedScreen}
                options={{
                    tabBarIcon:({color,size}) => (
                        <MaterialCommunityIcons name='home' color={color} size={26}/>
                    )
                }}  />
                <Tab.Screen name ='Profile' component={ProfileStack}
                options={{
                    tabBarIcon:({color,size}) => (
                        <MaterialCommunityIcons name='account-box' color={color} size={26}/>
                    )
                }}  />
                <Tab.Screen name ='Forum' component={ForumStack}
                options={{
                    tabBarIcon:({color,size}) => (
                        <MaterialCommunityIcons name='card-text-outline' color={color} size={26}/>
                    )
                }}  />
                <Tab.Screen name ='Post' component={Empty}
                listeners={({navigation}) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate('Post Something')
                    }
                })}
                options={{
                    tabBarIcon:({color,size}) => (
                        <MaterialCommunityIcons name='plus-box' color={color} size={26}/>
                    )
                }}  />
                

            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser},dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Main);

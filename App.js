import React from 'react';
import { StyleSheet,Image, Text, View, Animated } from 'react-native';
import Presentation from "./components/Presentation.js"
// import Swipeable from 'react-native-swipeable';
import LinearGradient from 'react-native-linear-gradient'
// import {PanGestureHandler} from 'react-native-gesture-handler'  
// var Sound = require('react-native-sound'); //to make it work need to be on a bare app, meaning that you need tochange the native code (react-native link does not work! in an expo app :( )
                                              //if you created your app using expo init, then you are a "managed" app, not a "bare" app

//IN CASE "expo start" does not connect with the correct IP address of the computer
// export env REACT_NATIVE_PACKAGER_HOSTNAME=192.168.41.89

// var Sound = require('react-native-sound');
import {play_sound} from './assets/sounds.js'
import {RosClient} from './RosClient.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      energy:1.5,
      mood: 6.1,
      curiosity: 9,

      is_first: false,
    }

    this.change_first= this.change_first.bind(this)

    /*Necessary here because we are passing this.client in Presentation.js*/ 
    this.client = new RosClient()
    this.client.setupRosbridgeClient();
    this.client.setupPublisher();
    this.client.setupStateSubscriber();
  }
  componentDidMount(){
    play_sound("intro")

  }
  updateAttribute = (type) =>{
    //TODO: Update it from the database!

    switch(type){
      case "energy":{
        this.setState({
          energy: this.state.energy+1
        })
        break;
      }
      case "mood":{
        this.setState({
          mood: this.state.mood+1
        })
        break;
      }
      case "curiosity":{
        this.setState({
          curiosity: this.state.curiosity+1
        })
        break;
      }
    }
  }
  change_first =()=>{
    //change it from the database!
    this.setState({
      is_first: false,
    })
  }
  render(){
    // <View style={styles.container}>
      {/* // <PanGestureHandler> */}
      {/* // </PanGestureHandler> */}
    // </View>
    return (
      // <PanGestureHandler
      // // maxPointers={2}
      // >
        <LinearGradient
          colors={["#453a94","#f43b47"]}
          style={styles.container}
          >
          <Presentation
          values ={this.state}
          updateAttribute={this.updateAttribute}
          client={this.client}
          is_first={this.state.is_first}
          change_first={this.change_first}
          />
        </LinearGradient>
      // </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FF6865',
  },
});

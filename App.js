import React from 'react';
import { StyleSheet,Image, Text, View, Animated } from 'react-native';
import Presentation from "./components/Presentation.js"
// import Swipeable from 'react-native-swipeable';
import {LinearGradient} from 'expo-linear-gradient'
// import {PanGestureHandler} from 'react-native-gesture-handler'  
// import {kjcnjdn} from 'expo'


//IN CASE "expo start" does not connect with the correct IP address of the computer
// export env REACT_NATIVE_PACKAGER_HOSTNAME=192.168.41.89

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      energy:1.5,
      mood: 6.1,
      curiosity: 9,

      is_first: false,
    }
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
  render(){
    return (
      // <View style={styles.container}>
        // <PanGestureHandler>
          <LinearGradient
          colors={["#453a94","#f43b47"]}
          style={styles.container}
          >
            <Presentation
            values ={this.state}
            updateAttribute={this.updateAttribute}
            />
          </LinearGradient>
        // </PanGestureHandler>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FF6865',
  },
});

import React from 'react';
import { StyleSheet,Image, Text, View, Animated } from 'react-native';
import Presentation from "./components/Presentation.js"
// import Swipeable from 'react-native-swipeable';
import LinearGradient from 'react-native-linear-gradient'
import {PanGestureHandler} from 'react-native-gesture-handler'  
// import {kjcnjdn} from 'expo'
// var Sound = require('react-native-sound'); //to make it work need to be on a bare app, meaning that you need tochange the native code (react-native link does not work! :( )
                                              //if you created your app using expo init, then you are a "managed" app, not a "bare" app
// import Sound from 'react-native-sound'
// import {Sounds} from './assets/sounds.js'
// import { Audio } from 'expo-av';
// import {play_audio} from './assets/sounds.js'

//IN CASE "expo start" does not connect with the correct IP address of the computer
// export env REACT_NATIVE_PACKAGER_HOSTNAME=192.168.41.89
// import {
//   Player,
//   Recorder,
//   MediaStates
// } from '@react-native-community/audio-toolkit';

// var Sound = require('react-native-sound');
import {playSound} from './assets/sounds.js'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      energy:1.5,
      mood: 6.1,
      curiosity: 9,

      is_first: false,
    }
    // this.play_audio= this.play_audio.bind(this)
    // this.soundObject = new Audio.Sound() //
  }
  // async play_audio(path){
  //   // console.log('PAAATH is',path)
  //   // try{
  //   //   const {sound: soundObject, status} = await Audio.Sound.createAsync(
  //   //     path,
  //   //     {shouldPlay: true}
  //   //   )
  //   // } catch(error){
  //   //   console.log("SAAAAAAAAAAAAAAAAD", error)
  //   // }

  //   // soundObject.playAsync()
  //   console.log("ahhhhhhhhhhhhhhh", typeof soundObject)
  //   // console.log(typeof soundObject)
  //   // soundObject.play()
  //   try {
  //     await this.soundObject.loadAsync(path);
  //     // console.log(typeof soundObject)

  //     await this.soundObject.playAsync();
  //     // Your sound is playing!
  //   } catch (error) {
  //     // An error occurred!
  //     console.log("nothing to play :(((((((((((((((((((((((((((((((((")
  //   }
  // }
  async componentDidMount(){
    // console.log(Object.getPrototypeOf(Sounds.name.source))
    // console.log(require('./assets/sounds/test.wav'))
    // Sounds.name.source.play_audio()
    // let song= require('./assets/sounds/test2.mp3')
    // let song2 = require('./assets/sounds/test.wav')
    // playSound("test2")
    // var whoosh =new Sound(require('./assets/sounds/test2.mp3'), (error) =>{
    //   if (error){
    //     console.log("sad")
    //     return 
    //   }
    //   console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

    //   whoosh.play()
    //   // whoosh.stop(() => {
    //   //   // Note: If you want to play a sound after stopping and rewinding it,
    //   //   // it is important to call play() in a callback.
    //   //   whoosh.play();
    //   // });
    // })
    // , Sound.MAIN_BUNDLE, (error) => {
    //   if (error) {
    //     console.log('failed to load the sound', error);
    //     return;
    //   }
    //   // loaded successfully
    //   console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    
    //   // Play the sound with an onEnd callback
    //   whoosh.play((success) => {
    //     if (success) {
    //       console.log('successfully finished playing');
    //     } else {
    //       console.log('playback failed due to audio decoding errors');
    //     }
    //   });
    // });
    // whoosh.stop(() => {
    //   // Note: If you want to play a sound after stopping and rewinding it,
    //   // it is important to call play() in a callback.
    //   whoosh.play();
    // });
    
    // whoosh.play()
    
    // new Player('test.wav').play()
    // play_audio(this.soundObject, require('./assets/sounds/test.wav'))

    // play_audio(this.soundObject, song2 )

    // play_audio(this.soundObject, )
    // try{
    //   const {sound: soundObject, status} = await Audio.Sound.createAsync(
    //     require('./assets/sounds/test.wav'),
    //     {shouldPlay: true}
    //   )
    // } catch(error){
    //   console.log("SAAAAAAAAAAAAAAAAD", error)
    // }
    // const soundObject = new Audio.Sound();
    // try {
    //   // await soundObject.loadAsync(require('./assets/sounds/test2.mp3'));
    //   await soundObject.loadAsync(require('./assets/sounds/test.wav'));

    //   await soundObject.playAsync();
    //   // Your sound is playing!
    // } catch (error) {
    //   // An error occurred!
    //   console.log(error)
    // }

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

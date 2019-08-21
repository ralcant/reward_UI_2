import React from 'react'
import {Animated, Text,Image, Easing, StyleSheet, Dimensions, PanResponder, TouchableHighlight} from 'react-native'
// import Swipeable from 'react-native-swipeable';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {sleep} from './sleep.js'
// import {Audio} from 'expo-av'
// import {play_audio} from '../assets/sounds.js'

// const {width} = Dimensions.get('window')
// console.log(width)
import {play_sound, sound_loop} from '../assets/sounds.js'

export default class Coin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            width_bar: new Animated.Value(0),
            scale: new Animated.Value(1),
            is_responder: true
        }
        this.props.animateTo(0, this.props.value, this.state.width_bar);
        this.pan = new Animated.ValueXY()
        this.handlePanResponder()
    }
    handlePanResponder = ()=>{
        this._val = { x:0, y:0}
        this.pan.addListener((value) => this._val = value)
        this.panResponder = PanResponder.create({
            // onStartShouldSetPanResponder: (e, gesture)=> {
            //     // console.log(gesture);
            //     return(
            //         Math.abs(gesture.dx) >= 0
            //     )
            // // },
            // onResponderTerminationRequest: (e, gesture) => {
            //     return  true
            // },
            // onResponderTerminationRequest: ()=> false,
            onStartShouldSetPanResponder: this.handleShouldSetOnStart,
            onMoveShouldSetPanResponder: this.handleShouldStartOnMove,
            onPanResponderGrant: this.handleOnResponderGrant,
            onPanResponderMove: this.handleOnResponderMove,
            onPanResponderRelease: this.handleOnResponderRelease,
        })
    }
    handleShouldSetOnStart= ()=>{
        return this.state.is_responder // so that it cannot be recovered when it's already going to jibo
    }
    handleShouldStartOnMove = (e, gesture)=>{
        return this.state.is_responder && gesture.numberActiveTouches <= 1

        // return this.state.is_responder
        // if (0<=gesture.x0 <=wp(100) && 0<=gesture.y0<=hp(100)){
        //     return true
        // }
        // return false
        // return gesture.dx > 15 && gesture.dx <30
    }
    handleOnResponderGrant = (e, gesture) =>{
        // sound_loop("coin_picked")
        console.log("granted!")
        this.pan.setOffset({
            x: this._val.x,
            y: this._val.y
        });
        this.pan.setValue({x: 0, y: 0});
        this.state.scale.setValue(increasing_scale); //should I do a setState() instead?
        this.props.show_only(this.props.type)
    }
    handleOnResponderMove = (e, gesture)=>{
        Animated.event([null, {dx: this.pan.x, dy: this.pan.y}])(e, gesture); //if you call this on if (gesture.dx >0),  the coin will only move to the right

        if (gesture.dx >0){
            // play_sound('coin_compressing')
            this.props.decreaseWidth(gesture.dx) //so that the bar table decreases with the same amount the coin moves to the right (this way they are in sync)
            this.props.visibleSwipe(false) //if it's going to the right, it won't show it
        }else{
            this.props.visibleSwipe(true) //if it's going to the left (or same place) it will show it 
        }
    }
    handleOnResponderRelease = (e, gesture) =>{
        console.log("Responder finished!!!!!!!!!!!!!!!!1")

        if (gesture.dx < 0){
            //going back to original state
            play_sound('coin_back_to_normal')
            this.props.restartOpacity() //sets all 3 attributes to visible --> general opacity comes back to 0.5

            Animated.parallel([
                Animated.timing(this.pan, {
                    toValue: {x:0, y:0},
                    duration:500,
                    easing:Easing.linear
                }).start(),
                Animated.timing(this.state.scale,{
                    toValue:1,
                    duration:600
                }).start()
            ])

        } else{
            play_sound('coin_release', volume=4)
            this.props.restartWidth()

            this.setState({
                is_responder: false //once it's moving, you cannot stop it!
            })
            Animated.timing(this.pan,{
            duration:1500,  //has to be the same time as the time it takes to restartWidth(), so that it seems more natural
            toValue:{x: -wp(100), y:0},
            // duration:1000,
            // easing: Easing.bounce,
            }).start(() =>{
                this.props.updateAttribute(this.props.type)
                play_sound("increase_level")
                //TODO: trigger Jibo's screen response and script
                this.props.jibo_rewarded(this.props.type)
                //maybe get out of the app instead of just deleting?
                // await sleep(2000) //xso that the change of the type is visible
                // this.props.removeItem() //sets visibility to false, and then the the three being false makes eveyrhting dissapear
            })
        }
    }
    render(){
        let width_bar ={
            //should make it a fixed distance from the end of the bar?
            right: this.state.width_bar,
            marginRight: 20//this.state.scale._value <= 1? 0: COIN_RIGHT_MARGIN
        }
        if (this.props.movable){
            return(
                this.props.coin_visible &&
                <Animated.Image 
                style={[
                    width_bar,
                    {transform:[
                        {translateX: this.pan.x},
                        {scale:this.state.scale}
                    ]},
                    styles.coin
                ]}
                source= {this.props.image_source}                          
                {...this.panResponder.panHandlers}
      
            />
            )
        } else{
            return(
                this.props.coin_visible &&
                <Animated.Image
                style={[
                    width_bar,
                    styles.coin,
                    {transform:[
                        {scale: increasing_scale},
                    ]}
                ]}
                source={this.props.image_source}
                />
            )
        }
    }
}

//HAVE TO BE IN SYNC WITH ATTRIBUTE.JS
const radio_bar = 1/5;
const increasing_scale= 1.5
const COIN_RADIUS = hp(100)*radio_bar/increasing_scale //so that when the coin is bigger it's the same width as the bar
// const COIN_RIGHT_MARGIN = COIN_RADIUS*(increasing_scale-1)

const styles= StyleSheet.create({
    coin:{
        width: COIN_RADIUS, 
        height: COIN_RADIUS,
        position: "absolute",

        // borderColor: "black",
        // borderWidth:10,
    }
})
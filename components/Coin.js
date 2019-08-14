import React from 'react'
import {Animated, Text,Image, Easing, StyleSheet, Dimensions, PanResponder, TouchableHighlight} from 'react-native'
// import Swipeable from 'react-native-swipeable';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const {width} = Dimensions.get('window')
// console.log(width)
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
    handleShouldSetOnStart= (e, gesture)=>{
        return this.state.is_responder // so that it cannot 
        console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        if (gesture.numberActiveTouches >=2){
            return false
        }
        return true
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
        console.log("granted!")
        this.pan.setOffset({
            x: this._val.x,
            y: this._val.y
        });
        this.pan.setValue({x: 0, y: 0});
        this.state.scale.setValue(increasing_scale);
        this.props.changeOpacity(this.props.type)
        // this.props.visibleSwipe(false)
    }
    handleOnResponderMove = (e, gesture) =>{
        // this.props.decreaseWidth(gesture.dx)
        // console.log(gesture)
        // console.log("this is moving")
        if (gesture.numberActiveTouches <= 1){
            // console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
                    //only if the gesture is to the rigth, decrease the width of the bar}
            Animated.event([null, {dx: this.pan.x, dy: this.pan.y}])(e, gesture); //uf you call it on if(gesture.dx >0), it will only move to the right

            if (gesture.dx >0){
                this.props.decreaseWidth(gesture.dx)
                this.props.visibleSwipe(false) //if it's going to the right, it won't show it
            }else{
                this.props.visibleSwipe(true) //if it's going to the left (or same place) it will show it 
            }
        }else{
            this.setState({
                is_responder: false
            }, ()=>{
                this.handlePanResponder()
            })
        }





        // else{
        //     this.props.decreaseWidth(gesture.dx)
        // }

    }
    handleOnResponderRelease = (e, gesture) =>{
            

        console.log("Responder finished!!!!!!!!!!!!!!!!1")
        this.props.restartWidth()
        // this.props.visibleSwipe(true)
        // console.log(gesture)
        if (gesture.dx < 0){
            //going back to original state
            // this.props.changeOpacity(0.5)
            this.props.restartOpacity() 

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
            // console.log(gesture)
            this.setState({
                is_responder: false //once it's moving, you cannot stop it!
            })
            Animated.timing(this.pan,{
            duration:1500,  //has to be the same time as the time it takes to restartWidth(), so that it seems more natural
            // delay:100
            toValue:{x: -width, y:0},
            // duration:1000,
            // easing: Easing.bounce,
            }).start(() =>{
                this.props.updateAttribute(this.props.type)
                this.props.removeItem()
            })
        }
    }
    componentDidMount(){
        // this.props.decreaseWidth(0)
        if (this.props.width_bar === 0){
            console.log("its 000000000000000000000000000000000000")
        }

    }
    render(){
        // console.log(this.state.scale._value)
        let width_bar ={
            //should make it a fixed distance from the end of the bar?
            right: this.state.width_bar,
            marginRight: 20//this.state.scale._value <= 1? 0: COIN_RIGHT_MARGIN
            // right: this.state.width_coin,
        }
        // const transform = [{
        //     translateX: this.pan.x
        // }]
        // console.log(this.pan)
        // const transform = [...this.pan.getTranslateTransform()];
        // console.log(transform)
        return(
            <Animated.Image 
            style={[
                this.props.style,width_bar,
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
    }
}

//HAVE TO BE IN SYNC WITH ATTRIBUTE.JS
// const screen = Dimensions.get('screen')
const radio_bar = 1/5;
const increasing_scale= 1.5
const COIN_RADIUS = hp(100)*radio_bar/increasing_scale //so that when the coin is bigger it's the same width as the bar
const COIN_RIGHT_MARGIN = COIN_RADIUS*(increasing_scale-1)

const styles= StyleSheet.create({
    coin:{
        width: COIN_RADIUS, 
        height: COIN_RADIUS,
        // marginRight: 0,//COIN_RIGHT_MARGIN,
        position: "absolute",

        // borderColor: "black",
        // borderWidth:10,
    }
})
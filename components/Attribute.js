import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Easing } from 'react-native';
import Coin from './Coin.js'
// import Swipeable from 'react-native-swipeable';
import images from "../assets/images.js"
import CurvedRectangle from './CurvedRectangle.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Attribute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            width_bar: new Animated.Value(0),
            initial: props.value,
        }
        this.type = this.props.info.type;  //"energy", "mood" or "curiosity"   
        this.animateTo(0, this.props.value, this.state.width_bar);


    }
    componentDidUpdate = ()=>{
        if (this.props.value !== this.state.initial){
            //so that thee width_bar is on sync with
            this.animateTo(0, this.props.value, this.state.width_bar)
        }
    }
    // shouldComponentUpdate(){
    //     // if this.state.width_
    // }
    animateTo = (delay, value, animated) =>{
        // this.type = this.props.info.type;        

        console.log("this is running")
        Animated.timing(animated,{
            toValue: value,
            duration: 1000,
        }).start( ()=>{
            console.log(`this.state.width is ${this.state.width_bar._value}`)
        })
    }
    componentDidMount(){
        console.log(`[ComponentDidMount in Attribute.js] this.state.width is ${this.state.width_bar._value}`)
        // this.animateTo(0, this.props.value, this.state.width_bar);

    }

    decreaseWidth = (decrease)=>{
        // let current_width = this.state.width_bar;
        // console.log(current_width)
        // console.log(current_width instanceof Animated.Value, decreaseAnimated instanceof Animated.Value)

        this.setState((prevState) => {
            //result needs to be an Animated.Value object
            let result = new Animated.Value(this.props.value-decrease);
            // let result = new Animated.Value(Animated.subtract(prevState.width_bar, decreaseAnimated))
            // console.log(`However, result is ${result instanceof Animated.Value}  `)            
            return {
                width_bar: result,
            }
        })
    }
    restartWidth = ()=>{
        // console.log(this.state.width_bar instanceof Animated.Value)
        Animated.timing(this.state.width_bar,{
            toValue: this.props.value,
            duration:1000,
            easing: Easing.bounce,
        }).start();
        // Animated.spring(this.state.width_bar,{
        //     friction:3,
        //     toValue: this.props.value,
        //     // duration:1000,
        // }).start();
        // this.animateTo(0,0, this.state.width_bar)
    }
    colorSelector = (value)=>{
        if (0 <= value && value < 4 ){
            return "#ff3641"

            // return "#DA291CFF" 
        }
        if (4 <= value && value < 7){
            return "#FF4500"
        }
        if (7 <= value && value <= 10){
            return "#53A567FF"
        } 
        else{
            console.log("[color selector in Attribute.js] This shouldn't happen. Remember, energy, mood and curiosity should be in the interval [0,10]")
        }
    }
    render(){
        // console.log(`[render Attribute.js]: this.state.width is ${this.state.width_bar instanceof Animated.Value} Animated.Value`)
        let table_color = this.colorSelector(this.props.info.label)
        const widthStyle={
            backgroundColor: table_color,
            width: this.state.width_bar,
            // right:0,
            // borderTopLeftRadius: 4,
            // borderBottomRightRadius: 4,
            // flex:1,
        }
        const text_width ={ //USE IT IF YOU WANT TO MOVE THE TEXT BELOW THE COIN (don't forget to disable rigth:0 from styles.text)
            //should make it a fixed distance from the end of the bar?
            right: this.state.width_bar,
            marginRight:10,
        }
        let table_image = require('../assets/img/test.jpg')
        let image_source= require('../assets/jibocoin.png');

        let {label} = this.props.info;
        let text_image= images[this.type][label].text;

        return(
            <View style={styles.attribute_container}>
                {/* <Animated.View>
                    <CurvedRectangle info={{width: this.state.width_bar}} style={[styles.table]} />
                </Animated.View> */}
                <CurvedRectangle info={{width: this.state.width_bar, color: table_color}}/>

                {/* <Animated.Image
                    source={table_image}
                    style={[styles.table, widthStyle]}
                />   */}
                <Coin
                    image_source={image_source}
                    value={this.props.value}
                    decreaseWidth={this.decreaseWidth}
                    restartWidth= {this.restartWidth}
                    updateAttribute={this.props.updateAttribute}
                    type={this.type}
                    visibleSwipe={this.props.visibleSwipe}
                />
                <Animated.Image
                    style={[styles.text]}
                    source={text_image}
                />
            </View>

        )
    }
}

// const screen = Dimensions.get('screen')
const radio_bar = 1/5;

const styles= StyleSheet.create({
    attribute_container:{
        flex:1,
        flexDirection:"row",
        alignItems: "center",
        //for testing purposes
        // borderColor:"pink",
        // borderWidth:10,
    },
    // table:{
    //     position: "absolute",
    //     right:0,
    //     height:screen.height*radio_bar,
    //     // bottom: 0,
    //     // flex:1,
    //     borderColor: "blue",
    //     borderWidth:10,
    //     // flex:0.5,
    // },
    text:{
        position: "absolute",
        width: hp(100)*(1/3-radio_bar)/2*3,
        height:hp(100)*(1/3-radio_bar)/2,
        right:0,
        bottom: 0
    },
})
import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Easing } from 'react-native';
import Coin from './Coin.js'
// import Swipeable from 'react-native-swipeable';
import images from "../assets/images.js"
import CurvedRectangle from './CurvedRectangle.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import sleep from './sleep.js'

export default class Attribute extends React.Component{
    constructor(props){
        super(props);
        this.initial = props.value;
        this.state={
            width_bar: new Animated.Value(0),
            opacity: 0.5,
        }
        this.type = this.props.info.type;  //"energy", "mood" or "curiosity"
        this.animateTo(0, this.props.value, this.state.width_bar);


    }
    componentDidUpdate = ()=>{
        if (this.props.value !== this.initial){
            //so that this.state.width_bar is always on sync with this.props.value
            this.animateTo(0, this.props.value, this.state.width_bar)
        }
    }
    animateTo = (delay, value, animated) =>{
        // this.type = this.props.info.type;
        Animated.timing(animated,{
            toValue: value,
            duration: 1000,
        }).start( ()=>{
            console.log(`this.state.width is ${this.state.width_bar._value}`)
        })
    }
    componentDidMount(){
        console.log(`[ComponentDidMount in Attribute.js] this.state.width is ${this.state.width_bar._value}`)
        this.animateTo(0, this.props.value, this.state.width_bar);
        // if (this.state.width_bar._value ===0){
        //     // console.log("IT'S O  :((((((((((((((((((((((((((((((")
        // }
    }

    decreaseWidth = (decrease)=>{
        // let current_width = this.state.width_bar;
        // console.log(current_width)
        // console.log(current_width instanceof Animated.Value, decreaseAnimated instanceof Animated.Value)

        this.setState((prevState) => {
            //result needs to be an Animated.Value object
            let result = new Animated.Value(this.props.value-decrease);
            return {
                width_bar: result,
            }
        })
    }
    restartWidth = ()=>{
        // console.log(this.state.width_bar instanceof Animated.Value)
        Animated.timing(this.state.width_bar,{
            toValue: this.props.value,
            duration:1500,
            easing: Easing.bounce,
        }).start();
        // Animated.spring(this.state.width_bar,{
        //     friction:3,
        //     toValue: this.props.value,
        //     // duration:1000,
        // }).start();
        // this.animateTo(0,0, this.state.width_bar)
    }
    // colorSelector = (value)=>{
    //     if (0 <= value && value < 4 ){
    //         return "#ff3641"

    //         // return "#DA291CFF"
    //     }
    //     if (4 <= value && value < 7){
    //         return "#FF4500"
    //     }
    //     if (7 <= value && value <= 10){
    //         return "#53A567FF"
    //     }
    //     else{
    //         console.log("[color selector in Attribute.js] This shouldn't happen. Remember, energy, mood and curiosity should be in the interval [0,10]")
    //     }
    // }
    // changeOpacity = (value)=>{
    //     this.setState({
    //         opacity: value
    //     })
    // }
    render(){

        // console.log(`[render Attribute.js]: this.state.width is ${this.state.width_bar instanceof Animated.Value} Animated.Value`)
        let table_color = '#ffcd03' //this.colorSelector(this.props.info.label)
        const widthStyle={
            backgroundColor: table_color,
            width: this.state.width_bar,
            // right:0,
            // borderTopLeftRadius: 4,
            // borderBottomRightRadius: 4,
            // flex:1,
        }
        let opacity_style = {
            opacity: this.props.is_visible? 1: 0//this.state.opacity,
        }
        const text_width ={ //USE IT IF YOU WANT TO MOVE THE TEXT BELOW THE COIN (don't forget to disable rigth:0 from styles.text)
            //should make it a fixed distance from the end of the bar?
            right: this.state.width_bar,
            marginRight:10,
        }
        let image_source= images[this.type].coin.source 

        let {label} = this.props.info;
        let text_image= images[this.type][label].text;
        let opacity_style_2={
            opacity: this.props.is_visible? 1:0.5
        }

        return(
            <View style={[opacity_style_2, styles.attribute_container]}>
                {/* <Animated.View>
                    <CurvedRectangle info={{width: this.state.width_bar}} style={[styles.table]} />
                </Animated.View> */}
                <CurvedRectangle info={{width: this.state.width_bar, color: table_color, label: label}}/>

                {/* <Animated.Image
                    source={table_image}
                    style={[styles.table, widthStyle]}
                />   */}
                <Coin
                    style={opacity_style}
                    image_source={image_source}
                    value={this.props.value}
                    decreaseWidth={this.decreaseWidth}
                    restartWidth= {this.restartWidth}
                    updateAttribute={this.props.updateAttribute}
                    type={this.type}
                    visibleSwipe={this.props.visibleSwipe}
                    animateTo={this.animateTo}
                    changeOpacity={this.props.changeOpacity}
                    restartOpacity={this.props.restartOpacity}
                    removeItem={this.props.removeItem}
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
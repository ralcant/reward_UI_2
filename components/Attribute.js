import React from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import Coin from './Coin.js'
import Swipeable from 'react-native-swipeable';
import images from "../assets/images.js"

export default class Attribute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            width_bar: new Animated.Value(0),
            initial: props.value 
        }
        this.type = this.props.info.type;        

        this.animateTo(0, this.props.value, this.state.width_bar);
    }
    componentDidUpdate = ()=>{
        if (this.props.value !== this.state.initial){
            //so that thee width_bar is on sync with
            this.animateTo(0, this.props.value, this.state.width_bar)
        }
    }
    animateTo = (delay, value, animated) =>{
        // this.type = this.props.info.type;        

        console.log("this is running")
        Animated.timing(animated,{
            toValue: value,
            duration: 1000,
        }).start( ()=>{
            console.log(`this.state.width is ${this.state.width_bar instanceof Animated.Value} Animated.Value`)
        })
    }
    // rightRelease =()=>{
    //     console.log("moved to the right! ")
    // }
    // leftRelease= ()=>{
    //     console.log("moved to the left!")
    // }

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
        }, () =>{
            console.log(`After setting the state, this.state.width_bar is ${this.state.width_bar instanceof Animated.Value} instance of Animated.Value`)

        })

            
            
        //     {
        //     width_bar: Animated.subtract(current_width, decreaseAnimated),
        //     // prevWidth: current_width,
        // }, () =>{
        //     console.log("sfssadsssssssssss",this.state.width_bar instanceof Animated.Value)
        // })

    }
    restartWidth = ()=>{
        // console.log(this.state.width_bar instanceof Animated.Value)
        Animated.timing(this.state.width_bar,{
            toValue: this.props.value,
            duration:1000,
            easing: Easing.bounce,
        }).start(()=>{

        });
        // Animated.spring(this.state.width_bar,{
        //     friction:3,
        //     toValue: this.props.value,
        //     // duration:1000,
        // }).start();
        // this.animateTo(0,0, this.state.width_bar)
    }
    render(){
        console.log(`[render Attribute.js]: this.state.width is ${this.state.width_bar instanceof Animated.Value} Animated.Value`)
        const widthStyle={
            backgroundColor: this.props.color,
            width: this.state.width_bar,
            // postition: ""
            // right:0,
            // postition: "absolute",
            // borderTopLeftRadius: 4,
            // borderBottomRightRadius: 4,
            // flex:1,
        }
        // console.log(this.state.width_bar)
        const width ={
            //should make it a fixed distance from the end of the bar?
            right: this.state.width_bar,
            marginRight:10,
        }
        // const width_text

        //TODO: Calculate this images with respect to the values of the state!
        let image_source= require('../assets/jibocoin.png');
        // let label = 1
        let {label} = this.props.info;
        let text_image= images[this.type][label].text;
        return(
            <View style={styles.attribute_container}>
                <Animated.View 
                    style={[styles.table, widthStyle]}
                />  
                <Coin
                    image_source={image_source}
                    value={this.props.value}
                    decreaseWidth={this.decreaseWidth}
                    restartWidth= {this.restartWidth}
                    updateAttribute={this.props.updateAttribute}
                    type={this.type}
                />
                <Animated.Image
                    style={[    styles.text]}
                    source={text_image}
                />
            </View>

        )
    }
}
const styles= StyleSheet.create({
    attribute_container:{
        flex:1,
        flexDirection:"row",
        alignItems: "center",

        //for testing purposes
        // borderColor:"pink",
        // borderWidth:10,
    },
    table:{
        position: "absolute",
        right:0,
        height:150,
        // bottom: 0,
        // flex:1,
        // borderColor: "blue",
        // borderWidth:10,
        // flex:0.5,
    },
    text:{
        width: 150,
        height:50,
        position: "absolute",
        right:0,
        bottom: -5,
    },
})
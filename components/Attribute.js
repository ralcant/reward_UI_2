import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Easing } from 'react-native';
import Coin from './Coin.js'
import images from "../assets/images.js"
import CurvedRectangle from './CurvedRectangle.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import sleep from './sleep.js'

export default class Attribute extends React.Component{
    constructor(props){
        super(props);
        this.initial = props.value; //maximun width
        this.state={
            width_bar: new Animated.Value(0),
        }
        this.type = this.props.info.type;  //"energy", "mood" or "curiosity"
        this.animateTo(0, this.props.value, this.state.width_bar); //increasing the width up to certain value

    }
    componentDidUpdate = ()=>{
        if (this.props.value !== this.initial){
            //so that this.state.width_bar is always on sync with this.props.value (particulary special for when the coin is been dragged out of the screen)
            this.animateTo(0, this.props.value, this.state.width_bar)
        }
    }
    animateTo = (delay, value, animated) =>{
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
        // if (this.state.width_bar._value ===0){
        //     // console.log("IT'S O  :((((((((((((((((((((((((((((((")
        // }
    }

    decreaseWidth = (decrease)=>{
        this.setState(() => {
            //result needs to be an Animated.Value object for Animated.timing({toValue:...}) to work
            let result = new Animated.Value(this.props.value-decrease);
            return {
                width_bar: result,
            }
        })
    }
    restartWidth = ()=>{
        Animated.timing(this.state.width_bar,{
            toValue: this.props.value,
            duration:1500,
            easing: Easing.bounce,
        }).start();
    }
    render(){

        // console.log(`[render Attribute.js]: this.state.width is ${this.state.width_bar instanceof Animated.Value} Animated.Value`)
        let table_color = '#ffcd03' //this.colorSelector(this.props.info.label)
        // const widthStyle={
        //     backgroundColor: table_color,
        //     width: this.state.width_bar,
        //     // right:0,
        //     // borderTopLeftRadius: 4,
        //     // borderBottomRightRadius: 4,
        //     // flex:1,
        // }
        let coin_visible = this.props.is_visible && this.props.show_coin //coin will be visible only if show_coin is true and if the parent is visible

        let image_source= images[this.type].coin.source 

        let {label} = this.props.info;
        let text_image= images[this.type][label].text;
        let container_opacity_style={
            opacity: this.props.is_visible? 1:0.5
        }

        /*
        Possible States of the coin/table:
        -Coin and table opacity = 0.5 --> Happens when 
        */

        return(
            <View style={[container_opacity_style, styles.attribute_container]}>
                <CurvedRectangle info={{width: this.state.width_bar, color: table_color, label: label}}/>
                <Coin
                    coin_visible={coin_visible}
                    image_source={image_source}
                    value={this.props.value}
                    decreaseWidth={this.decreaseWidth}
                    restartWidth= {this.restartWidth}
                    updateAttribute={this.props.updateAttribute}
                    type={this.type}
                    visibleSwipe={this.props.visibleSwipe}
                    animateTo={this.animateTo}
                    show_only={this.props.show_only}
                    restartOpacity={this.props.restartOpacity}
                    // removeItem={this.props.removeItem}

                    movable={this.props.movable}
                />
                <Animated.Image
                    style={[styles.text]}
                    source={text_image}
                />
            </View>

        )
    }
}

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
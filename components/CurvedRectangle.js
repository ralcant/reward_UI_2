import React from 'react'
import {View, Text, StyleSheet,Dimensions, Animated} from 'react-native'
// import SingleCurvedRectangle from './SingleCurvedRectangle.js'

export default class CurvedRectangle extends React.Component{
    constructor(props){
        super(props);
    }
    getAnimatedViews = (count,  general_style) =>{
        result =[]
        for (let i =0; i< count; i++){
            result.push(<Animated.View key={i} style={[styles.single, general_style]}/>)
        }
        return result
    }
    divisions = (width) =>{
        if (0=== width){
            return 5
        }
        return Math.floor(screen.width/width)+1
        if (0<= width && width <= 2*screen.width/3){
            console.log(Math.floor(screen.width/width))
            return 10
        }
        return 2
    }
    render(){
        // console.log("[CurvedRectangle.js] this.props.info.width=", this.props.info.width)
        // let new_width = new Animated.Value(this.props.info.width._value/3)
        // console.log(`ajsgvdbajhsbhjbasdbs new_width is ${new_width._value}`)
        let {width, color} = this.props.info
        let number_divisions = 10//this.divisions(width._value)
        let individual_width = width._value/number_divisions;
        // let borderRadius = Math.sqrt(individual_width*individual_width+screen.height*radio_bar*screen.height*radio_bar)/2
        let borderRadius = screen.height*radio_bar/2;
        // let borderRadius =  width._value/2
        let general_style = {
            backgroundColor: color,
            borderRadius: borderRadius,
            // borderTopRightRadius: borderRadius,
            // borderBottomRightRadius: borderRadius,
        } 
        console.log('Number of divisions here is !:',number_divisions)
        return(
            <Animated.View style={[styles.container, {width: width}]}>
                {this.getAnimatedViews(number_divisions, general_style)}
            </Animated.View>
        )
    }
}
const screen = Dimensions.get('screen')
const radio_bar = 1/5;

const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "row",
        position: "absolute",
        right:0,
        height:screen.height*radio_bar,
        // borderColor: "blue",
        // borderWidth:10,
        // flex:0.5,
    },
    single:{
        flex:1,
    }
})
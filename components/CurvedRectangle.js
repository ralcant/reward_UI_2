import React from 'react'
import {View, Text, StyleSheet,Dimensions, Animated} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class CurvedRectangle extends React.Component{
    constructor(props){
        super(props);
    }
    getAnimatedViews = (count,  general_style) =>{
        result =[]
        for (let i =0; i< count; i++){
            result.push(<View key={i} style={[styles.single, general_style]}/>)
        }
        return result
    }
    render(){
        let {width, color, label} = this.props.info
        let number_divisions = label
        // let individual_width = width._value/number_divisions;
        // let borderRadius = Math.sqrt(individual_width*individual_width+screen.height*radio_bar*screen.height*radio_bar)/2 
        let borderRadius = hp(100)*radio_bar/2; //half of the height //TODO: play with different types of borderRadius and see how they look on screen
        let general_child_style = {
            backgroundColor: color,
            borderRadius: borderRadius,
        } 
        return(
            <Animated.View style={[{width: width},styles.container]}>
                {this.getAnimatedViews(number_divisions, general_child_style)}
            </Animated.View>
        )
    }
}
const radio_bar = 1/5; //radio of the bar's height with respect to the device's height

const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "row",
        position: "absolute",
        right:0,
        height:hp(100)*radio_bar,
        // borderColor: "blue",
        // borderWidth:10,
    },
    single:{
        flex:1,
    }
})
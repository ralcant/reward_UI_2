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
    // divisions = (width) =>{
    //     if (0=== width){
    //         return 5
    //     }
    //     return Math.floor(screen.width/width)+1
    //     if (0<= width && width <= 2*screen.width/3){
    //         console.log(Math.floor(screen.width/width))
    //         return 10
    //     }
    //     return 2
    // }
    componentDidMount(){
        if (this.props.info.width._value === 0){
            
        }
    }
    render(){
        // let new_width = new Animated.Value(this.props.info.width._value/3)
        // console.log(`ajsgvdbajhsbhjbasdbs new_width is ${new_width._value}`)
        let {width, color, label} = this.props.info
        // let number_divisions = width._value===0 ? 1:label//this.divisions(width._value)
        let number_divisions = label
        // let individual_width = width._value/number_divisions;
        // let borderRadius = Math.sqrt(individual_width*individual_width+screen.height*radio_bar*screen.height*radio_bar)/2
        let borderRadius = hp(100)*radio_bar/2; //half of the height
        // let borderRadius =  width._value/2
        let general_style = {
            backgroundColor: color,
            borderRadius: borderRadius,
            // opacity: 0.5,
            // borderTopRightRadius: borderRadius,
            // borderBottomRightRadius: borderRadius,
        } 
        return(
            <Animated.View style={[{width: width},styles.container]}>
                {this.getAnimatedViews(number_divisions, general_style)}
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
        // flex:0.5,
    },
    single:{
        flex:1,
    }
})
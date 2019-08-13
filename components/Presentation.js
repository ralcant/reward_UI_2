import React from 'react';
import { StyleSheet, Text, View,Image, Animated, Dimensions, ImageBackground } from 'react-native';
import Attribute from "./Attribute.js"
import floatConversion from './floatConversion.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class Presentation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showSwipe: true,
        }
    }
    visibleSwipe = (visible) =>{
        if (this.state.showSwipe !== visible){
            this.setState({
                showSwipe: visible,
            })
        }
    }
    render(){
        let {energy, mood, curiosity} = this.props.values;


        let energy_integer_level=  floatConversion(energy); 
        let mood_integer_level= floatConversion(mood);
        let curiosity_integer_level= floatConversion(curiosity);

        //bear in mind the integer_levels are integers from 0 to 10.
        let energy_bar_width = energy_integer_level* wp(100/15);
        let mood_bar_width = mood_integer_level* wp(100/15);
        let curiosity_bar_width = curiosity_integer_level* wp(100/15);

        let swipe_image = require('../assets/img/test_swipe_3.gif')
        return(
                <View style={styles.container}>
                    {
                    this.state.showSwipe &&
                    <Image source={swipe_image} style={styles.swipe_icon}/>
                    }

                    <Attribute
                    value={energy_bar_width}
                    info={{type: "energy", label: energy_integer_level}}
                    // color={this.colorSelector(energy)}
                    updateAttribute={this.props.updateAttribute}
                    visibleSwipe={this.visibleSwipe}
                    
                    />
                    <Attribute
                    value={mood_bar_width} 
                    info={{type: "mood", label: mood_integer_level}}
                    // color={this.colorSelector(mood)}
                    updateAttribute={this.props.updateAttribute}
                    visibleSwipe={this.visibleSwipe}

                    />
                    <Attribute
                    value={curiosity_bar_width}
                    info={{type: "curiosity", label: curiosity_integer_level}} 
                    // color={this.colorSelector(curiosity)}   
                    updateAttribute={this.props.updateAttribute}
                    visibleSwipe={this.visibleSwipe}

                    />
                </View>
                

        )
    }
}

// const screen = Dimensions.get('screen')
// console.log(screen)
console.log(`(width, height) is ${wp(100)}, ${hp(100)}`)
const swipe_icon_percentange = 30; 
const styles =StyleSheet.create({
    container:{
        flex:1,
    },
    swipe_icon:{ //this makes the icon be on the left center
        position: "absolute", //necessary so that it does not conflict with the other images

        width: `${swipe_icon_percentange}%`,
        height:`${swipe_icon_percentange}%`,
        top: `${50-swipe_icon_percentange/2}%`, 
        // alignSelf: "center",
        // justifyContent: "center",
        // flexDirection: "row",       
        // bottom:'50%',

        //for testing purposes
        // borderWidth: 10,
        // borderColor: "blue",
        // overlayColor: "blue"

        // left:0,
        // justifyContent:"center",
        // alignSelf:"center",
    }

})
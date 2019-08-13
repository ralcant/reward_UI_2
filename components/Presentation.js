import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import Attribute from "./Attribute.js"
import { Asset } from 'expo-asset';
import floatConversion from './floatConversion.js'


const window = Dimensions.get('window');
console.log(window)
export default class Presentation extends React.Component{
    constructor(props){
        super(props);
    }
    colorSelector = (value)=>{
        if (0 <= value && value < 4 ){
            return "#DA291CFF" 
        }
        if (4 <= value && value < 7){
            return "#FF4500"
        }
        if (7 <= value && value <= 10){
            return "#53A567FF"
        } 
        else{
            console.log("[color selector in Presentation.js] This shouldn't happen. Remember, energy, mood and curiosity should be in the interval [0,10]")
        }
    }
    render(){
        let {energy, mood, curiosity} = this.props.values;


        let energy_integer_level=  floatConversion(energy); 
        let mood_integer_level= floatConversion(mood);
        let curiosity_integer_level= floatConversion(curiosity);

        let energy_bar_width = energy_integer_level* window.width/15;
        let mood_bar_width = mood_integer_level* window.width/15;
        let curiosity_bar_width = curiosity_integer_level* window.width/15;

        return(

            <View style={styles.container}>
                <Attribute
                value={energy_bar_width}
                info={{type: "energy", label: energy_integer_level}}
                color={this.colorSelector(energy)}
                updateAttribute={this.props.updateAttribute}
                
                />
                <Attribute
                value={mood_bar_width} 
                info={{type: "mood", label: mood_integer_level}}
                color={this.colorSelector(mood)}
                updateAttribute={this.props.updateAttribute}

                />
                <Attribute
                value={curiosity_bar_width}
                info={{type: "curiosity", label: curiosity_integer_level}} 
                color={this.colorSelector(curiosity)}   
                updateAttribute={this.props.updateAttribute}

                />
            </View>
        )
    }
}
const styles =StyleSheet.create({
    container:{
        flex:1,
    },
    energy:{
        flex:1,
        // position: "absolute",

    },
    mood:{
        flex:1,
        // position: "absolute",

    },
    curiosity:{
        flex:1,
        // position: "absolute",

    },

})
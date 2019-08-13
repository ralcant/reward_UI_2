import React from 'react'
import {View, StyleSheet, Text, Animated} from 'react-native'

export default class SingleCurvedRectangle extends React.Component{
    constructor(props){
        super(props);
    }
    render(){    
        let table_image = require('../assets/img/test.jpg')
        // let changingWidth= {
        //     width:this.props.width,
        // }
        return(
            <Animated.View style ={[styles.container]}/>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // height:100,
        // width:100,
        borderRadius:20,
        backgroundColor: "red"
    }
})
import React from 'react'
import {Animated, Text,Image, Easing, StyleSheet, Dimensions, PanResponder, TouchableHighlight} from 'react-native'
import Swipeable from 'react-native-swipeable';


const {width} = Dimensions.get('window')
// console.log(width)
export default class Coin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            width_bar: new Animated.Value(0),
            scale: new Animated.Value(1),
        }
        this.animateTo(0, this.props.value, this.state.width_bar);
        this.pan = new Animated.ValueXY()
        // this.hanldePanResponder()
    // }
    // hanldePanResponder = ()=>{
        this._val = { x:0, y:0}
        this.pan.addListener((value) => this._val = value)
        this.panResponder = PanResponder.create({
            // onStartShouldSetPanResponder: (e, gesture)=> {
            //     // console.log(gesture);
            //     return(
            //         Math.abs(gesture.dx) >= 0
            //     )
            // },
            onMoveShouldSetPanResponder: (e, gesture) =>{
                // console.log(gesture)
                return true
                // return gesture.dx > 15 && gesture.dx <30
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.pan.setOffset({
                    x: this._val.x,
                    y: this._val.y
                });
                this.pan.setValue({x: 0, y: 0});
                this.state.scale.setValue(1.25);

            },
            onPanResponderMove: (e, gesture) =>{
                // this.props.decreaseWidth(gesture.dx)

                //only if the gesture is to the rigth, decrease the width of the bar
                if (gesture.dx >0){
                    this.props.decreaseWidth(gesture.dx)
                }
                // else{
                //     this.props.decreaseWidth(gesture.dx)
                // }

                Animated.event([null, {dx: this.pan.x, dy: this.pan.y}])(e, gesture);
            
            },
            onPanResponderRelease: (e, gesture) => {
                // console.log(gesture);
                

                this.props.restartWidth()
                console.log(gesture)

                if (gesture.dx < 0){
                    //going back to original state
                    Animated.parallel([
                        Animated.timing(this.pan, {
                            toValue: {x:0, y:0},
                            duration:500,
                            easing:Easing.linear
                        }).start(),
                        Animated.timing(this.state.scale,{
                            toValue:1,
                            duration:600
                        }).start()
                    ])
  
                } else{
                    // console.log(gesture)
                    Animated.timing(this.pan,{
                        // tension: 0.00000001*gesture.dx,
                        // velocity: gesture.dx/400,
                        // speed: 1,
                        duration:1000,
                        // delay:100
                        toValue:{x: -width, y:0},
                        // duration:1000,
                        // easing: Easing.linear
                    }).start(() =>{
                        this.props.updateAttribute(this.props.type)
                    })
                }

            }

        })
    }
    animateTo = (delay, value, animated) =>{
        console.log("this is running")
        Animated.timing(animated,{
            toValue: value,
            duration: 1000,
        }).start()
    }
    render(){
        const width_bar ={
            //should make it a fixed distance from the end of the bar?
            right: this.state.width_bar,
            margin:10,
            // right: this.state.width_coin,
        }
        let leftContent= <Text>Pull to activate</Text>;
        let rightContent = <Text>YAYYY im going to the righttttt</Text>
        // const transform = [{
        //     translateX: this.pan.x
        // }]
        console.log(this.pan)
        // const transform = [...this.pan.getTranslateTransform()];
        // console.log(transform)
        return(
            <Animated.Image 
            style={[width_bar, styles.coin,{transform:[{translateX: this.pan.x},{scale:this.state.scale}]}]}
            source= {this.props.image_source}                          
            {...this.panResponder.panHandlers}
  
        />
        )

        return(
            <Swipeable 
            leftContent={leftContent} 
            onSwipeRelease = {console.log("it's moving!")}
            // rightContent={rightContent} 
            // onRef={console.log("yayy")}
            // onRightActionRelease ={this.rightRelease()}
            onLeftActionRelease ={this.leftRelease()}
            >
                <Animated.Image 
                    style={[width_bar, styles.coin,transform]}
                    source= {this.props.image_source}    
                />

                {/* <Image  
                    style={[styles.coin]}
                    source= {this.props.image_source}    
                /> */}
                {/* <Text>My swipeable content</Text> */}
                    
            </Swipeable>
        )
    }
}

const styles= StyleSheet.create({
    coin:{
        // flex:1,
        width: 120,
        height: 120,
        // right:0,
        position: "absolute",

        // borderColor: "black",
        // borderWidth:10,
    }
})
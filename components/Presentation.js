import React from 'react';
import { StyleSheet, Text, View,Image, Animated, Dimensions, ImageBackground } from 'react-native';
import Attribute from "./Attribute.js"
import floatConversion from './floatConversion.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import {Sounds} from '../assets/sounds.js'
// var Sound = require('react-native-sound');
import {play_sound} from '../assets/sounds.js'

export default class Presentation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showSwipe: null,

            movable: null,
            /*
            -If it's not the first interaction, show all the coins from the beginning!
            -If it's the first interaction, then at FIRST don't show any coins (this changes to true after being first mounted!)
            */ 
            show_coin: !props.is_first, 

            //using props instead of this.props will prevent them from updating when is_first changes, which is good
            energy_visible: true,
            mood_visible: true,
            curiosity_visible: true,

        }
        console.log(this.state.energy_visible, this.state.mood_visible, this.state.curiosity_visible)
        this.client= this.props.client
        this.show_only= this.show_only.bind(this)
    }
    async componentDidMount(){
        if (!this.props.is_first){
            //say general openings!
            await this.client.send_robot_tts_cmd("oh hello")

            this.setState({
                showSwipe: true,
                movable: true,
                energy_visible: true,
                mood_visible: true,
                curiosity_visible: true,

                show_coin: true,
            })
        }else{
            //say introduction opening!
            await this.client.send_robot_tts_cmd("<es name=Emoji_Clap nonBlocking='true'/> Excellent Job <pID_name>! <break size='0.5'/> Everytime that you finish an activity you will win a token! You can use this token to help me.".replace("<pID_name>", "Jon"))
            
            //this will call render --> componentDidUpdate
            this.setState({
                showSwipe: false,
                movable: false,
                energy_visible: false,
                mood_visible: false,
                curiosity_visible: false,

                show_coin: true,
                
            })
        }
    }
    async componentDidUpdate(){
        let en_visible= this.state.energy_visible;
        let mo_visible = this.state.mood_visible;
        let cu_visible = this.state.curiosity_visible;
        // console.log('States now: (energy, mood, curiosity)',en_visible, mo_visible,cu_visible);
        if (this.props.is_first){
          if (!en_visible && !mo_visible && !cu_visible){
            //make Jibo talk, don't call this.setState until AFTER jibo finished talking  
            console.log("into first if")
            play_sound("showing_coin")
            this.show_only("energy")
          } 
          if (en_visible && !mo_visible && !cu_visible){
            //make Jibo talk, don't call this.setState until AFTER jibo finished talking
            console.log("into second if!")
            await this.client.send_robot_tts_cmd("If you drag it to the ENERGY bucket, <es name=Emoji_Battery nonBlocking='true'/> my energy will increase. Also, <break size='0.7'/> <es name=excited_05 nonBlocking='true'/>I will be more awake and ready to play with you!"); 
            play_sound("showing_coin")
            
            this.show_only("mood")
          }
          if (!en_visible && mo_visible && !cu_visible){
            //make Jibo talk, don't call this.setState until AFTER jibo finished talking
            console.log("into third if")
            await this.client.send_robot_tts_cmd("On the other hand, if you drag it to the MOOD bucket, my mood will increase, <es name=excited_05 nonBlocking='true'/> and I will be more happy!") //, callback)
            play_sound("showing_coin")
            
            this.show_only("curiosity")
          }
          if (!en_visible && !mo_visible && cu_visible){
            await this.client.send_robot_tts_cmd("Finally, if you drag the token to the CURIOSITY bucket, I will become more curious. Also, I will <es name=Emoji_Question nonBlocking='true'/>ask many questions, which is important <es name=Emoji_School nonBlocking='true'/>for learning new things!."); 
            this.props.change_first()
            this.restartOpacity()
            this.setState({
                movable: true,
                showSwipe: true,
            })
            }
        }
    
      }

    visibleSwipe = (visible) =>{
        if (this.state.showSwipe !== visible){
            this.setState({
                showSwipe: visible,
            })
        }
    }
    show_only(type){
        switch(type){
            case "energy":{
                this.setState({
                    energy_visible: true,
                    mood_visible: false,
                    curiosity_visible: false
                })
                break;
            }
            case "mood":{
                this.setState({
                    energy_visible: false,
                    mood_visible: true,
                    curiosity_visible: false
                })
                break;
            }
            case "curiosity":{
                this.setState({
                    energy_visible: false,
                    mood_visible: false,
                    curiosity_visible: true
                })
                break;
            }

        }
    }
    restartOpacity = ()=>{
        this.setState({
            energy_visible: true,
            mood_visible: true,
            curiosity_visible: true,

        })
    }
    // removeItem = () =>{
    //     this.setState({
    //         energy_visible: false,
    //         mood_visible: false,
    //         curiosity_visible: false
    //     })
    // }
    width_bar = (level) =>{

        /*
        You can customize the level for each level 0, 1, 2,..., 9, 10 
        Useful if level 1 is too short! or level 10 is too large D:
        */

        return level* wp(100/15)
    }
    render(){
        let {energy, mood, curiosity} = this.props.values;


        let energy_integer_level=  floatConversion(energy); 
        let mood_integer_level= floatConversion(mood);
        let curiosity_integer_level= floatConversion(curiosity);

        //bear in mind the integer_levels are integers from 0 to 10.
        let energy_bar_width = this.width_bar(energy_integer_level)
        let mood_bar_width = this.width_bar(mood_integer_level);
        let curiosity_bar_width = this.width_bar(curiosity_integer_level);


        let style_condition={ //only pertinent to the attributes
            opacity: (this.state.energy_visible && this.state.mood_visible && this.state.curiosity_visible) ? 0.5 : 1, //if all attributes are visible, then opacity:0.5
            display: (!this.state.energy_visible && !this.state.mood_visible && !this.state.curiosity_visible)? "none": "flex" //if all attributes are unvisible, then don't show it
        }
        return(
                <View style={styles.container}>
                    {
                    this.state.showSwipe &&
                    <Image source={require('../assets/img/test_swipe_3.gif')} style={[styles.swipe_icon]}/>
                    }
                    <View style={[style_condition, {flex:1}]}>
                        <Attribute
                        value={energy_bar_width}
                        info={{type: "energy", label: energy_integer_level}}
                        // color={this.colorSelector(energy)}
                        updateAttribute={this.props.updateAttribute}
                        // removeItem={this.removeItem}
                        visibleSwipe={this.visibleSwipe}
                        is_visible ={this.state.energy_visible}
                        show_only={this.show_only}
                        restartOpacity={this.restartOpacity}
                        // style_condition={style_condition}

                        show_coin={this.state.show_coin}
                        movable={this.state.movable}
                        />
                        <Attribute
                        value={mood_bar_width} 
                        info={{type: "mood", label: mood_integer_level}}
                        // color={this.colorSelector(mood)}
                        updateAttribute={this.props.updateAttribute}
                        visibleSwipe={this.visibleSwipe}
                        is_visible={this.state.mood_visible}
                        show_only={this.show_only}
                        restartOpacity={this.restartOpacity}
                        // style_condition={style_condition}
                        // removeItem={this.removeItem}

                        show_coin={this.state.show_coin}
                        movable={this.state.movable}

                        />
                        <Attribute
                        value={curiosity_bar_width}
                        info={{type: "curiosity", label: curiosity_integer_level}} 
                        // color={this.colorSelector(curiosity)}   
                        updateAttribute={this.props.updateAttribute}
                        visibleSwipe={this.visibleSwipe}
                        is_visible={this.state.curiosity_visible}
                        show_only={this.show_only}
                        restartOpacity={this.restartOpacity}
                        // style_condition={style_condition}
                        // removeItem={this.removeItem}

                        show_coin={this.state.show_coin}
                        movable={this.state.movable}

                        />
                    </View>
                </View>
                

        )
    }
}

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
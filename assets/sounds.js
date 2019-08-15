
import { Audio } from 'expo-av';

// // export default class Sound{
// //     constructor(path){
// //         this.sound = new Audio.Sound()
// //         this.sound.loadAsync(require(path))
// //     }
// //     play= ()=>{
// //         this.sound.playAsync()
// //     }

// // }







// // export default Sound

// export const Sounds = {
//     "name":{
//         "source": load_sound(require('./sounds/test.wav'))
//     }
// }

// async function load_sound(path){
//     let new_sound = new Audio.Sound()
//     try {
//         await new_sound.loadAsync(path)
//         await soundObject.playAsync();

//         return new_sound
        
//     } catch(error){
//         console.log("saaaaaaaaaaaaaaaaaad")
//     }
// }


export async function play_audio(soundObject, path){

    let soundObject2 = new Audio.Sound()
    try {
        await soundObject2.loadAsync(path);
  
        await soundObject2.playAsync();
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
        console.log(error)
        // console.log("nothing to play :(((((((((((((((((((((((((((((((((")
    }
}

// module.export = play_audio;
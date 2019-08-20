var Sound = require('react-native-sound');


export function play_sound(song_name, volume){
    if (!volume){
        volume = 1
    }
    let song = sounds[song_name].source
    const callback = (error, sound) =>{
        if (error){
            console.log("There was a problem uploading the audio")
            return;
        }
        console.log(`${song_name} sound succesfuly loaded`)
        console.log(volume)
        sound.setVolume(volume)
        sound.play(()=>{

            //release it when it's done so we're not using up resources
            // sound.release()
        })
    }
    const sound = new Sound(song, error => callback(error, sound))

    return sound
}

export function sound_loop(song_name){
    let sound = play_sound(song_name)
    sound.setNumberOfLoops(-1);
}

export let sounds = {
    "test2":{
        source: require('./sounds/test2.mp3')
    },
    "coin_picked":{
        source: require('./sounds/test.wav')
    },
    "coin_back_to_normal":{
        source: require('./sounds/coin_back_to_normal.mp3')
    },
    "coin_compressing":{
        source: require('./sounds/coin_compressing.mp3')
    },
    "coin_release":{
        source: require('./sounds/coin_release_3.mp3')
    }
}
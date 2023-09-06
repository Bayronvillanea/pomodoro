import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, SafeAreaView, Platform, TouchableOpacity } from 'react-native';

import {Audio} from "expo-av"

import Header from './src/Components/Header';
import Timer from './src/Components/Timer';

import { useEffect, useState } from 'react';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];


export default function App() {
  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(25*60)
  const [currentTime,setCurrentTime] = useState("POMO"|"SHORT"|"BREACK")
  const [isActive,setIsActive]= useState(false)

    useEffect(()=>{
    let interval = null
    if(isActive){
      interval = setInterval(()=>{
        setTime(time-1)
      },1000)
    }else{
      clearInterval(interval)
    }
    if (time === 0) {
      setIsActive(false);
      setIsWorking(!isWorking);
      setTime(isWorking ? 300 : 1500); 
    }
    return ()=> clearInterval(interval)
    },[isActive,time])
    
  function handleStartStop(){
    playSound()
    setIsActive(!isActive)
  }

  async function playSound(){
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/SoundClick.mp3")
    )
    await sound.playAsync()
  }

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors[currentTime]}]}>
    <View style={{flex:1,paddingHorizontal:15, paddingTop: Platform.OS === "android" && 30}}>
      <Text style={styles.text}>Pomodoro</Text>
      

      <Header
      setTime={setTime}
      currentTime={currentTime}
      setCurrentTime={setCurrentTime}
      />
      <Timer
      time={time}
      />
      <TouchableOpacity onPress={handleStartStop} style={styles.button}>
        <Text style={{color:"white",fontWeight:"bold"}}>
          {isActive ? "STOP" : "START"}
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    fontSize:32,fontWeight:'bold'
  },
  button:{
    backgroundColor:"#333333",
    padding:15,
    marginTop:15,
    borderRadius:15,
    alignItems:"center"
  }
});
